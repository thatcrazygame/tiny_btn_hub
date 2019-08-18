from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from .devicegroup import devicegroup
from marshmallow import Schema, fields


class Device(Entity, Base):
    __tablename__ = 'device'

    name = Column(String, nullable=False, unique=True)
    device_type_id = Column(
        Integer,
        ForeignKey('devicetype.id'),
        nullable=False
    )

    device_type = relationship('DeviceType', back_populates='devices')

    groups = relationship(
        'Group_d',
        secondary=devicegroup,
        back_populates='devices'
    )

    def __init__(self, name, device_type_id, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.device_type_id = device_type_id


class DeviceSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    device_type = fields.Nested('DeviceTypeSchema', exclude=('devices',))
    device_type_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
