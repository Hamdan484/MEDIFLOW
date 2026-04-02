from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt

import models, schemas
from database import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = "super_secret_mediflow_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 1 day

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.phone == user.phone).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    hashed_pwd = get_password_hash(user.password)
    new_user = models.User(
        full_name=user.full_name,
        phone=user.phone,
        role=user.role.value,
        hashed_password=hashed_pwd
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # If pharmacist, create pharmacy record
    if user.role.value == "seller":
        if not user.pharmacy_name or not user.license_number:
            raise HTTPException(status_code=400, detail="Pharmacy details required for Seller role")
        
        new_pharmacy = models.Pharmacy(
            owner_id=new_user.id,
            name=user.pharmacy_name,
            license_number=user.license_number,
            location=user.location,
            status="pending"
        )
        db.add(new_pharmacy)
        db.commit()
        
    return {"message": "User registered successfully!"}

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.phone == user.phone).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password",
        )
    
    access_token = create_access_token(
        data={"sub": db_user.phone, "role": db_user.role.value, "id": db_user.id}
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "role": db_user.role.value, 
        "full_name": db_user.full_name
    }
