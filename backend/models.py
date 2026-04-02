from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import enum

class RoleEnum(str, enum.Enum):
    buyer = "buyer"
    seller = "seller"
    admin = "admin"

class StatusEnum(str, enum.Enum):
    pending = "pending"
    approved = "approved"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.buyer)
    hashed_password = Column(String(255), nullable=False)
    
    pharmacy = relationship("Pharmacy", back_populates="owner", uselist=False)

class Pharmacy(Base):
    __tablename__ = "pharmacies"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(150), nullable=False)
    license_number = Column(String(100), unique=True, index=True)
    location = Column(String(200))
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    
    owner = relationship("User", back_populates="pharmacy")
    medicines = relationship("Medicine", back_populates="pharmacy")

class Medicine(Base):
    __tablename__ = "medicines"
    id = Column(Integer, primary_key=True, index=True)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"))
    name = Column(String(100), nullable=False)
    generic_name = Column(String(100))
    price = Column(Float)
    stock_count = Column(Integer, default=0)
    category = Column(String(100))
    
    pharmacy = relationship("Pharmacy", back_populates="medicines")
