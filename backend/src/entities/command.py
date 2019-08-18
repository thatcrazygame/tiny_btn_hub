from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from marshmallow import Schema, fields


class Command(Entity, Base):
    __tablename__ = 'command'

    name = Column(String, nullable=False)
    args = relationship('Arg', back_populates='command')

    def __init__(self, name, created_by):
        Entity.__init__(self, created_by)
        self.name = name


class CommandSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    args = fields.Nested(
        'ArgSchema',
        exclude=('command',),
        many=True
    )
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
