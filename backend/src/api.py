from flask_cors import CORS
from flask import Flask, jsonify, request
from sqlalchemy.exc import IntegrityError
from .entities.entity import Session, engine, Base
from .entities.btn import Btn, BtnSchema
from .entities.btnaction import BtnAction, BtnActionSchema
from .entities.action import Action, ActionSchema
from .entities.command import Command, CommandSchema
from .entities.devicetype import DeviceType, DeviceTypeSchema
from .entities.device import Device, DeviceSchema
from .entities.group_d import Group_d, GroupDSchema
from .entities.arg import Arg, ArgSchema
from .entities.argvalue import ArgValue, ArgValueSchema

from .auth import AuthError, requires_auth, requires_role

app = Flask(__name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)

# ---------------- Btns ---------------- #
@app.route('/btns', endpoint='get_btns')
def get_btns():
    # fetching from the database
    session = Session()
    btn_objects = session.query(Btn).all()

    # transforming into JSON-serializable objects
    schema = BtnSchema(many=True)
    btns = schema.dump(btn_objects)

    # serializing as JSON
    session.close()
    return jsonify(btns.data), 200


@app.route('/btns', methods=['POST'], endpoint='add_btn')
@requires_auth
def add_btn():
    posted_btn = BtnSchema(only=('id', 'name', 'counter'))\
        .load(request.get_json())

    btn = Btn(**posted_btn.data, created_by="HTTP post request")

    session = Session()
    session.add(btn)
    session.commit()

    new_btn = BtnSchema().dump(btn).data
    session.close()
    return jsonify(new_btn), 201


@app.route('/btns/<btnId>', methods=['DELETE'], endpoint='delete_btn')
@requires_role('admin')
def delete_btn(btnId):
    session = Session()
    btn = session.query(Btn).filter_by(id=btnId).first()
    session.delete(btn)
    session.commit()
    session.close()
    return '', 201


# ---------------- Devices ---------------- #
@app.route('/devices', endpoint='get_devices')
def get_devices():
    # fetching from the database
    session = Session()
    device_objects = session.query(Device).all()

    # transforming into JSON-serializable objects
    schema = DeviceSchema(many=True)
    devices = schema.dump(device_objects)

    # serializing as JSON
    session.close()
    return jsonify(devices.data), 200


@app.route('/devices', methods=['POST'], endpoint='add_device')
@requires_auth
def add_device():
    posted_device = DeviceSchema(only=('name', 'device_type_id'))\
        .load(request.get_json())

    device = Device(**posted_device.data, created_by="HTTP post request")

    session = Session()
    return_code = 201
    new_device = {}
    try:
        session.add(device)
        session.commit()
        new_device = DeviceSchema().dump(device).data

    except IntegrityError:
        return_code = 422
        session.rollback()

    session.close()
    return jsonify(new_device), return_code


@app.route('/devices/<deviceId>', methods=['DELETE'], endpoint='delete_device')
@requires_role('admin')
def delete_device(deviceId):
    session = Session()
    device = session.query(Device).filter_by(id=deviceId).first()
    session.delete(device)
    session.commit()
    session.close()
    return '', 201


# ---------------- DeviceTypes ---------------- #
@app.route('/devices/types', endpoint='get_device_types')
def get_device_types():
    # fetching from the database
    session = Session()
    device_type_objects = session.query(DeviceType).all()

    # transforming into JSON-serializable objects
    schema = DeviceTypeSchema(many=True)
    device_types = schema.dump(device_type_objects)

    # serializing as JSON
    session.close()
    return jsonify(device_types.data), 200


@app.route('/devices/types', methods=['POST'], endpoint='add_device_type')
@requires_auth
def add_device_type():
    posted_device_type = DeviceSchema(only=('name',))\
        .load(request.get_json())

    device_type = DeviceType(
        **posted_device_type.data,
        created_by="HTTP post request"
    )

    session = Session()
    session.add(device_type)
    session.commit()

    new_device_type = DeviceTypeSchema().dump(device_type).data
    session.close()
    return jsonify(new_device_type), 201


@app.route(
    '/devices/types/<deviceTypeId>',
    methods=['DELETE'],
    endpoint='delete_device_type'
)
@requires_role('admin')
def delete_device_type(deviceTypeId):
    session = Session()
    device_type = session.query(DeviceType).filter_by(id=deviceTypeId).first()
    session.delete(device_type)
    session.commit()
    session.close()
    return '', 201


# ---------------- Actions ---------------- #
@app.route('/actions', endpoint='get_actions')
def get_actions():
    # fetching from the database
    session = Session()
    action_objects = session.query(Action).all()

    # transforming into JSON-serializable objects
    schema = ActionSchema(many=True)
    actions = schema.dump(action_objects)

    # serializing as JSON
    session.close()
    return jsonify(actions.data), 200


@app.route('/actions', methods=['POST'], endpoint='add_action')
@requires_auth
def add_action():
    posted_action = ActionSchema(only=('name',))\
        .load(request.get_json())

    action = Action(**posted_action.data, created_by="HTTP post request")

    session = Session()
    return_code = 201
    new_action = {}
    try:
        session.add(action)
        session.commit()
        new_action = ActionSchema().dump(action).data

    except IntegrityError:
        return_code = 422
        session.rollback()

    session.close()
    return jsonify(new_action), return_code


@app.route('/actions/<actionId>', methods=['DELETE'], endpoint='delete_action')
@requires_role('admin')
def delete_action(actionId):
    session = Session()
    action = session.query(Action).filter_by(id=actionId).first()
    session.delete(action)
    session.commit()
    session.close()
    return '', 201


# ---------------- Commands ---------------- #
@app.route('/commands', endpoint='get_commands')
def get_commands():
    # fetching from the database
    session = Session()
    command_objects = session.query(Command).all()

    # transforming into JSON-serializable objects
    schema = CommandSchema(many=True)
    commands = schema.dump(command_objects)

    # serializing as JSON
    session.close()
    return jsonify(commands.data), 200


@app.route('/commands', methods=['POST'], endpoint='add_command')
@requires_auth
def add_command():
    posted_command = CommandSchema(only=('name',))\
        .load(request.get_json())

    command = Command(**posted_command.data, created_by="HTTP post request")

    session = Session()
    return_code = 201
    new_command = {}
    try:
        session.add(command)
        session.commit()
        new_command = CommandSchema().dump(command).data

    except IntegrityError:
        return_code = 422
        session.rollback()

    session.close()
    return jsonify(new_command), return_code


@app.route(
    '/commands/<commandId>',
    methods=['DELETE'],
    endpoint='delete_command'
)
@requires_role('admin')
def delete_command(commandId):
    session = Session()
    command = session.query(Command).filter_by(id=commandId).first()
    session.delete(command)
    session.commit()
    session.close()
    return '', 201


@app.route(
    '/commands/<commandId>/args',
    methods=['POST'],
    endpoint='add_command_arg'
)
@requires_auth
def add_command_arg(commandId):
    session = Session()
    command = session.query(Command).filter_by(id=commandId).first()

    return_code = 201
    new_arg = {}
    if command is not None:
        posted_arg = ArgSchema(only=('name', 'type', 'required'))\
            .load(request.get_json())

        arg = Arg(
            **posted_arg.data,
            command_id=command.id,
            created_by="HTTP post request"
        )
        command.args.append(arg)
        session.commit()
        new_arg = ArgSchema().dump(arg).data
    else:
        return_code = 422

    session.close()
    return jsonify(new_arg), return_code


@app.route(
    '/commands/args/<argId>',
    methods=['DELETE'],
    endpoint='delete_command_arg'
)
@requires_role('admin')
def delete_command_arg(argId):
    session = Session()
    arg = session.query(Arg).filter_by(id=argId).first()
    session.delete(arg)
    session.commit()
    session.close()
    return '', 201


# ---------------- Groups ---------------- #
@app.route('/groups', endpoint='get_groups')
def get_groups():
    # fetching from the database
    session = Session()
    group_objects = session.query(Group_d).all()

    # transforming into JSON-serializable objects
    schema = GroupDSchema(many=True)
    groups = schema.dump(group_objects)

    # serializing as JSON
    session.close()
    return jsonify(groups.data), 200


@app.route('/groups', methods=['POST'], endpoint='add_group')
@requires_auth
def add_group():
    posted_group = GroupDSchema(only=('name',))\
        .load(request.get_json())

    group = Group_d(**posted_group.data, created_by="HTTP post request")

    session = Session()
    return_code = 201
    new_group = {}

    try:
        session.add(group)
        session.commit()
        new_group = GroupDSchema().dump(group).data

    except IntegrityError:
        return_code = 422
        session.rollback()

    session.close()
    return jsonify(new_group), return_code


@app.route(
    '/groups/<groupId>',
    methods=['DELETE'],
    endpoint='delete_group'
)
@requires_role('admin')
def delete_group(groupId):
    session = Session()
    group = session.query(Group_d).filter_by(id=groupId).first()
    session.delete(group)
    session.commit()
    session.close()
    return '', 201


# ---------------- BtnActions ---------------- #
@app.route('/btnactions', endpoint='get_btnactions')
def get_btnactions():
    # fetching from the database
    session = Session()
    btnaction_objects = session.query(BtnAction).all()

    # transforming into JSON-serializable objects
    schema = BtnActionSchema(many=True)
    btnactions = schema.dump(btnaction_objects)

    # serializing as JSON
    session.close()
    return jsonify(btnactions.data), 200


@app.route('/btnactions', methods=['POST'], endpoint='add_btnaction')
@requires_auth
def add_btnaction():
    data = request.get_json()

    posted_btnaction = BtnActionSchema(only=(
        'btn_id',
        'action_id',
        'command_id',
        'group_id'
    )).load(data["btnaction"])

    btnaction = BtnAction(**posted_btnaction.data)

    session = Session()
    return_code = 201
    new_btnaction = {}
    try:
        btnaction.update_arg_values(data["argvalues"])
        session.add(btnaction)
        session.commit()
        new_btnaction = BtnActionSchema().dump(btnaction).data

    except IntegrityError:
        return_code = 422
        session.rollback()

    session.close()
    return jsonify(new_btnaction), return_code


@app.route(
    '/btnactions/<btnId>/<actionId>',
    methods=['DELETE'],
    endpoint='delete_btnaction'
)
@requires_role('admin')
def delete_btnaction(btnId, actionId):
    session = Session()
    btnaction = session.query(BtnAction).filter_by(
        btn_id=btnId, action_id=actionId
    ).first()
    session.delete(btnaction)
    session.commit()
    session.close()
    return '', 200


@app.route(
    '/btnactions/<btnId>/<actionId>',
    methods=['PUT'],
    endpoint='update_btnaction'
)
@requires_role('admin')
def update_btnaction(btnId, actionId):
    data = request.get_json()
    session = Session()
    response_code = 200

    btnaction = session.query(BtnAction).filter_by(
        btn_id=btnId, action_id=actionId
    )

    updated_btnaction = {}
    if btnaction is not None:
        btnaction.update(data["btnaction"])
        btnaction.first().update_arg_values(data["argvalues"])
        updated_btnaction = BtnActionSchema().dump(btnaction.first()).data
        session.commit()
    else:
        response_code = 404

    session.close()
    return jsonify(updated_btnaction), response_code


@app.route(
    '/groups/<groupId>/devices',
    methods=['PUT'],
    endpoint='update_group_devices'
)
@requires_role('admin')
def update_group_devices(groupId):
    session = Session()
    device_ids = request.get_json()["devices"]
    devices = session.query(Device) \
        .filter(Device.id.in_(list(device_ids))).all()

    group = session.query(Group_d).filter_by(id=groupId).first()
    group.devices_updated = True
    group.devices[:] = devices
    session.commit()
    updated_group = GroupDSchema().dump(group).data
    session.close()
    return jsonify(updated_group), 200


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
