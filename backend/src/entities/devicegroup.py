from sqlalchemy import Column, Integer, ForeignKey, Table
from .entity import Base
# from marshmallow import Schema, fields

devicegroup = Table(
    'devicegroup',
    Base.metadata,
    Column('group_id', Integer, ForeignKey('group_d.id'), primary_key=True),
    Column('device_id', Integer, ForeignKey('device.id'), primary_key=True)
)
