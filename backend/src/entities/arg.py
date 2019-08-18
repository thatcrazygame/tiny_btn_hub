from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from marshmallow import Schema, fields


class Arg(Entity, Base):
    __tablename__ = 'arg'

    command_id = Column(Integer, ForeignKey('command.id'), nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    required = Column(Boolean, nullable=False, default=True)

    command = relationship('Command', back_populates='args')
    # argvalues = relationship('ArgValue', back_populates='arg')

    def __init__(self, command_id, name, type, required, created_by):
        Entity.__init__(self, created_by)
        self.command_id = command_id
        self.name = name
        self.type = type
        self.required = required


class ArgSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    type = fields.Str()
    required = fields.Boolean()
    command_id = fields.Number()
    command = fields.Nested(
        'CommandSchema',
        exclude=('args',)
    )
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
