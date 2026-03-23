from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True)
    hash = Column(String, unique=True)
    path = Column(String)
    size = Column(Integer)

class UserFile(Base):
    __tablename__ = "user_files"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_id = Column(Integer, ForeignKey("files.id"))
    filename = Column(String)

    is_favorite = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)