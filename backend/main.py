from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
import models
from database import engine

# Auto-create tables if they don't exist
try:
    if engine:
        models.Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Warning: Skipping table creation because DB is unreachable. Did you create mediflow_db in MySQL?")

app = FastAPI(title="Mediflow API")

# Allow React frontend to consume the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mediflow Python Backend!"}
