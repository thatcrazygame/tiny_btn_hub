from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .entity import Entity, Base
# from .btnaction import BtnActionSchema
from marshmallow import Schema, fields


class Action(Entity, Base):
    __tablename__ = 'action'

    name = Column(String, nullable=False, unique=True)
    btns = relationship('BtnAction', back_populates='action')

    def __init__(self, name, created_by):
        Entity.__init__(self, created_by)
        self.name = name


class ActionSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
