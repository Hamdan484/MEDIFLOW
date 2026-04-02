from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib.parse
import os

# Priority 1: Check for Live Cloud Database URL (from Railway)
MYSQL_URL = os.environ.get("MYSQL_URL")

if MYSQL_URL:
    SQLALCHEMY_DATABASE_URL = MYSQL_URL
else:
    # Priority 2: Use Local Database for testing
    DB_USER = "root"
    DB_PASS = "Hamsik95@3"
    DB_HOST = "localhost"
    DB_NAME = "mediflow_db"
    
    encoded_pass = urllib.parse.quote_plus(DB_PASS) if DB_PASS else ""
    SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_pass}@{DB_HOST}/{DB_NAME}"

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    engine = None
    SessionLocal = None

Base = declarative_base()

def get_db():
    if not SessionLocal:
        raise Exception("Database not connected. Please create mediflow_db in MySQL.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
