from sqlalchemy import Column, String, Integer, ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from .entity import Base
from marshmallow import Schema, fields


class ArgValue(Base):
    __tablename__ = 'argvalue'

    arg_id = Column(
        Integer,
        ForeignKey('arg.id'),
        nullable=False,
        primary_key=True
    )
    btn_id = Column(
        Integer,
        nullable=False,
        primary_key=True
    )
    action_id = Column(
        Integer,
        nullable=False,
        primary_key=True
    )
    value = Column(String)

    arg = relationship('Arg', lazy='joined')

    # btnaction = relationship(
    #     'BtnAction',
    #     back_populates='argvalues'
    # )

    __table_args__ = (
        ForeignKeyConstraint(
            [btn_id, action_id], ['btnaction.btn_id', 'btnaction.action_id']
        ), {}
    )

    def __init__(self, arg_id, btn_id, action_id, value):
        self.arg_id = arg_id
        self.btn_id = btn_id
        self.action_id = action_id
        self.value = value

    def get_casted_value(self):
        type = self.arg.type
        raw_value = self.value
        if raw_value is None:
            raw_value = ""

        try:
            if type == 'string':
                return str(raw_value)
            elif type == 'float':
                return float(raw_value)
            elif type == 'integer':
                return int(raw_value)
            elif type == 'boolean':
                return raw_value == '1'
            else:
                return raw_value
        except ValueError:
            return None


class ArgValueSchema(Schema):
    arg_id = fields.Number()
    arg = fields.Nested('ArgSchema', include=('id', 'name'))
    btn_id = fields.Number()
    action_id = fields.Number()
    btnaction = fields.Nested('BtnActionSchema', exclude=('argvalues',))
    value = fields.Str()
