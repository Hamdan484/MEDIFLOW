from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import urllib.parse

# If MYSQL_URL is set in the environment (e.g., from Railway), use it.
# Otherwise, fall back to localhost credentials.
DATABASE_URL = os.environ.get("MYSQL_URL") or os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    DB_USER = "root"
    DB_PASS = "" 
    DB_HOST = "localhost"
    DB_NAME = "mediflow_db"

    encoded_pass = urllib.parse.quote_plus(DB_PASS) if DB_PASS else ""
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_pass}@{DB_HOST}/{DB_NAME}"

try:
    engine = create_engine(DATABASE_URL)
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
