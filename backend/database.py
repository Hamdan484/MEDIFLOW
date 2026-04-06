from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import urllib.parse

# If MYSQL_URL is set in the environment (e.g., from Railway), use it.
# Otherwise, fall back to localhost credentials.
DATABASE_URL = os.environ.get("MYSQL_URL") or os.environ.get("DATABASE_URL")

if DATABASE_URL:
    # Railway provides mysql:// but SQLAlchemy needs mysql+pymysql://
    if DATABASE_URL.startswith("mysql://"):
        DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
    print(f"[DB] Using cloud database URL (host hidden for security)")
else:
    DB_USER = "root"
    DB_PASS = "" 
    DB_HOST = "localhost"
    DB_NAME = "mediflow_db"

    encoded_pass = urllib.parse.quote_plus(DB_PASS) if DB_PASS else ""
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_pass}@{DB_HOST}/{DB_NAME}"
    print(f"[DB] Using local database: {DB_HOST}/{DB_NAME}")

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=300)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    print("[DB] Engine created successfully")
except Exception as e:
    print(f"[DB] ERROR creating engine: {e}")
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
