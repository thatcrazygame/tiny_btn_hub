import os
import errno
import logging
import logging.config
import threading
import serial
import json
import time
import queue

from entities.entity import Session, engine, Base
from entities.btn import Btn
from entities.btnaction import BtnAction
from entities.action import Action
from entities.command import Command
from entities.arg import Arg
from entities.argvalue import ArgValue
from entities.devicetype import DeviceType
from entities.device import Device
from entities.group_d import Group_d

from lifxlan import LifxLAN
from lifxlan.errors import WorkflowException
from groupext.groupext import GroupExt

Base.metadata.create_all(engine)

UPDATE_INTERVAL = 30


def setup_logging(
    default_path='logging.json',
    default_level=logging.INFO,
    env_key='LOG_CFG'
):
    """Setup logging configuration"""
    path = default_path
    value = os.getenv(env_key, None)

    try:
        os.makedirs('logs')
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise

    if value:
        path = value

    if os.path.exists(path):
        with open(path, 'rt') as f:
            config = json.load(f)
        logging.config.dictConfig(config)
    else:
        logging.basicConfig(
            level=logging.DEBUG,
            format='[%(levelname)-8s] [%(asctime)s]'
            ' [%(threadName)-12s] %(message)s',
        )


def read_serial(event_queue):
    ser = serial.Serial('/dev/ttyUSB0', 19200, 8, 'N', 1, timeout=1)
    while True:
        output = ser.readline().decode("utf-8").strip()
        if output != '':
            event_queue.put(output)


def update_group(group_id, group_list):
    logger = logging.getLogger(__name__)
    lifx = LifxLAN()
    db = Session()
    group = db.query(Group_d).filter_by(id=group_id).first()

    is_new = group.id not in group_list
    is_updated = group.devices_updated

    if is_new or is_updated:
        status = []
        if is_new:
            status.append("New")

        if is_updated:
            status.append("Updated")

        new_group = None
        try:
            new_group = GroupExt(
                lifx.get_devices_by_name(
                    [device.name for device in group.devices]
                ).get_device_list()
            )
        except WorkflowException:
            logger.warning(
                "Group failed - WorkflowException",
                exc_info=True
            )

        if new_group is not None:
            status_str = ",".join(status)
            devices_str = ", ".join(
                [device.name for device in group.devices]
            )

            logger.info(
                "{} - Group: {}\nDevices: {}"
                .format(status_str, group.name, devices_str)
            )

            group_list[group.id] = new_group
            group.devices_updated = False
            if len(group.devices) != len(new_group.get_device_list()):
                # just using this as a flag to force it to try again
                group.devices_updated = True

            db.commit()
    db.close()


def update_groups_loop(groups_list):
    while True:
        db = Session()
        db_groups = db.query(Group_d).all()
        db.close()

        update_threads = [
            threading.Thread(
                name="UpdateGroup-{}".format(group.id),
                target=update_group,
                args=(group.id, groups_list),
                daemon=True
            )
            for group in db_groups
        ]

        for t in update_threads:
            t.start()

        for t in update_threads:
            t.join()

        time.sleep(1)


def main():
    logger = logging.getLogger(__name__)
    lifx_groups = {}

    event_queue = queue.Queue()
    serial_thread = threading.Thread(
        name="SerialRead",
        target=read_serial,
        args=(event_queue,),
        daemon=True
    )
    serial_thread.start()

    group_update_thread = threading.Thread(
        name="GroupUpdate",
        target=update_groups_loop,
        args=(lifx_groups,),
        daemon=True
    )
    group_update_thread.start()

    while True:
        if event_queue.qsize() > 0:
            message = json.loads(event_queue.get())
            if message["success"]:
                sender = message["sender"]
                action = message["action"]
                count = message["count"]

                logger.info(
                    "Sent by: {:2} Action: {:9} Count: {:5}"
                    .format(sender, action, count)
                )

                db = Session()
                action = db.query(Action).filter_by(name=action).first().id

                btn_action = db.query(BtnAction).filter_by(
                    btn_id=sender, action_id=action
                ).first()

                counter_valid = False
                btn = db.query(Btn).filter_by(id=sender).first()
                if btn is not None and btn.counter < count:
                    btn.counter = count
                    counter_valid = True
                    db.commit()

                if btn_action is not None and counter_valid:
                    try:
                        group = lifx_groups[btn_action.group_id]
                        db_group = db.query(Group_d).filter_by(
                            id=btn_action.group_id
                        ).first()

                        command = db.query(Command).filter_by(
                            id=btn_action.command_id
                        ).first()

                        # args = btn_action.get_args_tuple()
                        # kwargs = btn_action.get_kwargs_dict()

                        cmd = getattr(group, command.name, None)
                        if callable(cmd):
                            # result = cmd(*args, **kwargs)
                            args = btn_action.get_args()
                            result = cmd(**args)

                            if result is None:
                                result = ""

                            logger.info(
                                "Group: '{}' "
                                "Command: {}({}) "
                                "Result: {}"
                                .format(
                                    db_group.name,
                                    command.name,
                                    btn_action.get_args_str(),
                                    result
                                )
                            )
                        else:
                            logger.warning(
                                "{} could not be run or is not a function"
                                .format(command.name)
                            )

                    except IndexError as e:
                        logger.warning(
                            "Lifx Group doesn't exist - WorkflowException: {}"
                            .format(e.message),
                            exc_info=True
                        )
                db.close()
        time.sleep(0.01)


if __name__ == "__main__":
    setup_logging()
    main()
