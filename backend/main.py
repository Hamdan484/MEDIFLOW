from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
import models
from database import engine
import os

app = FastAPI(title="Mediflow API")

# Allow React frontend to consume the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.on_event("startup")
def startup_event():
    port = os.environ.get("PORT", "8000")
    print(f"[STARTUP] Mediflow API starting on port {port}")
    # Auto-create tables if they don't exist
    try:
        if engine:
            models.Base.metadata.create_all(bind=engine)
            print("[STARTUP] Database tables created/verified successfully")
        else:
            print("[STARTUP] WARNING: No database engine available - tables not created")
    except Exception as e:
        print(f"[STARTUP] WARNING: Skipping table creation: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mediflow Python Backend!"}

