from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .entity import Base
from .argvalue import ArgValue
from marshmallow import Schema, fields


class BtnAction(Base):
    __tablename__ = 'btnaction'

    btn_id = Column(Integer, ForeignKey('btn.id'), primary_key=True)
    action_id = Column(Integer, ForeignKey('action.id'), primary_key=True)
    group_id = Column(Integer, ForeignKey('group_d.id'), nullable=False)
    command_id = Column(Integer, ForeignKey('command.id'), nullable=False)

    btn = relationship(
        'Btn',
        back_populates='btn_actions'
    )
    action = relationship(
        'Action',
        back_populates='btns'
    )

    argvalues = relationship(
        'ArgValue',
        cascade="all, delete-orphan"
    )

    def __init__(
        self,
        btn_id,
        action_id,
        group_id,
        command_id
    ):
        self.btn_id = btn_id
        self.action_id = action_id
        self.group_id = group_id
        self.command_id = command_id

    def get_args(self):
        args = {}
        if len(self.argvalues) > 0:
            args = {
                argvalue.arg.name: argvalue.get_casted_value()
                for argvalue in self.argvalues
                if argvalue.get_casted_value() is not None
            }

        return args

    def get_args_str(self):
        args = self.get_args()
        args_str = ""
        if len(args) > 0:
            args_str = ', '.join(
                [
                    '{}={!r}'.format(k, v)
                    for k, v in args.items()
                ]
            )
            # just gonna say this looks like the
            # Eye of Sauron or something
            args_str = "{{{0}}}".format(
                args_str
            )

        return args_str

    def update_arg_values(self, raw_argvalues):
        argsvalues = [
            ArgValue(
                arg_id=int(id),
                btn_id=self.btn_id,
                action_id=self.action_id,
                value=value
            )
            for id, value in raw_argvalues.items()
        ]

        self.argvalues[:] = argsvalues


class BtnActionSchema(Schema):
    btn_id = fields.Number()
    btn = fields.Nested('BtnSchema')
    action_id = fields.Number()
    action = fields.Nested('ActionSchema')
    group_id = fields.Number()
    group = fields.Nested('GroupDSchema')
    command_id = fields.Number()
    command = fields.Nested('CommandSchema')
    argvalues = fields.Nested(
        'ArgValueSchema',
        exclude=('btnaction',),
        many=True
    )
