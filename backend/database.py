from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import urllib.parse
import sys

# If MYSQL_URL is set in the environment (e.g., from Railway), use it.
# Otherwise, fall back to localhost credentials.
DATABASE_URL = os.environ.get("MYSQL_URL") or os.environ.get("DATABASE_URL")

print(f"DEBUG: DATABASE_URL is {'set' if DATABASE_URL else 'NOT set'}")

if DATABASE_URL:
    # Railway provides mysql:// but SQLAlchemy needs mysql+pymysql://
    if DATABASE_URL.startswith("mysql://"):
        DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
    print(f"[DB] Attempting to use cloud database URL")
else:
    DB_USER = "root"
    DB_PASS = "" 
    DB_HOST = "localhost"
    DB_NAME = "mediflow_db"

    encoded_pass = urllib.parse.quote_plus(DB_PASS) if DB_PASS else ""
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_pass}@{DB_HOST}/{DB_NAME}"
    print(f"[DB] Falling back to local database config (likely to fail in prod)")

try:
    # Use a small timeout for the connection to avoid hanging startup forever
    engine = create_engine(
        DATABASE_URL, 
        pool_pre_ping=True, 
        pool_recycle=300,
        connect_args={"connect_timeout": 5} # 5 second timeout
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    print("[DB] SQLAlchemy engine initialized")
except Exception as e:
    print(f"[DB] FATAL ERROR during engine initialization: {e}")
    # Don't let it crash the module import
    engine = None
    SessionLocal = None

Base = declarative_base()

def get_db():
    if not SessionLocal:
        print("[DB] Request for database session failed: No SessionLocal available")
        raise Exception("Database session provider not initialized. Check server logs.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

