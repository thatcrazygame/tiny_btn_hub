from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from .devicegroup import devicegroup
# from .device import DeviceSchema
from marshmallow import Schema, fields


class Group_d(Entity, Base):
    __tablename__ = 'group_d'

    name = Column(String, nullable=False)
    devices = relationship(
        'Device',
        secondary=devicegroup,
        back_populates='groups'
    )
    devices_updated = Column(Boolean, nullable=False)
    # actions = relationship('BtnAction')

    def __init__(self, name, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.devices_updated = False


class GroupDSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    devices = fields.Nested('DeviceSchema', many=True)
    devices_updated = fields.Boolean()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
