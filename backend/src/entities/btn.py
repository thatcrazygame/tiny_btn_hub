from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .entity import Entity, Base
# from .action import ActionSchema
from marshmallow import Schema, fields


class Btn(Entity, Base):
    __tablename__ = 'btn'

    id = Column(Integer, primary_key=True, autoincrement=False)
    name = Column(String, nullable=False)
    counter = Column(Integer, default=0)
    btn_actions = relationship(
        'BtnAction',
        back_populates='btn',
        cascade="all, delete-orphan"
    )

    def __init__(self, id, name, counter, created_by):
        Entity.__init__(self, created_by)
        self.id = id
        self.name = name
        self.counter = counter


class BtnSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    counter = fields.Number()
    btn_actions = fields.Nested('BtnActionSchema', exclude=('btn',), many=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
