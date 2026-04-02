from pydantic import BaseModel
from typing import Optional
import enum

class RoleEnum(str, enum.Enum):
    buyer = "buyer"
    seller = "seller"
    admin = "admin"

class UserCreate(BaseModel):
    full_name: str
    phone: str
    password: str
    role: RoleEnum
    # Optional fields for Pharmacist
    pharmacy_name: Optional[str] = None
    license_number: Optional[str] = None
    location: Optional[str] = None

class UserLogin(BaseModel):
    phone: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    full_name: str
