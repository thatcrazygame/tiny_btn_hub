from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from marshmallow import Schema, fields


class DeviceType(Entity, Base):
    __tablename__ = 'devicetype'

    name = Column(String, nullable=False, unique=True)
    devices = relationship('Device', back_populates='device_type')

    def __init__(self, name, created_by):
        Entity.__init__(self, created_by)
        self.name = name


class DeviceTypeSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    devices = fields.Nested(
        'DeviceSchema',
        exclude=('device_type',),
        many=True
    )
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
