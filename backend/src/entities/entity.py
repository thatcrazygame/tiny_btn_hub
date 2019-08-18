
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, event
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# db_url = 'localhost:5432'
db_name = 'btnhub.db'

engine = create_engine(f'sqlite:///{db_name}')
Session = sessionmaker(bind=engine)

Base = declarative_base()


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by
