from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import users, trips, bookings

app = FastAPI(
    title="SoloSync API",
    description="Backend API for SoloSync — a solo travel platform for finding and hosting trips.",
    version="1.0.0",
)

# CORS config
origins = settings.cors_origins_list

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(trips.router)
app.include_router(bookings.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SoloSync API"}

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}
