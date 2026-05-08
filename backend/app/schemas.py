from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field


# ─── AUTH ─────────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    name:     str       = Field(..., min_length=2, max_length=100)
    email:    EmailStr
    password: str       = Field(..., min_length=6)
    role:     str       = Field(default="traveler", pattern="^(traveler|host)$")

class LoginRequest(BaseModel):
    email:    EmailStr
    password: str

class UserOut(BaseModel):
    id:         str
    name:       str
    email:      str
    role:       str
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type:   str = "bearer"
    user:         UserOut


# ─── TRIPS ────────────────────────────────────────────────────────
class TripCreate(BaseModel):
    title:            str          = Field(..., min_length=3, max_length=200)
    location:         str          = Field(..., min_length=2, max_length=200)
    description:      Optional[str] = None
    start_date:       Optional[date] = None
    end_date:         Optional[date] = None
    max_participants: int           = Field(default=10, ge=1, le=500)
    price:            Decimal        = Field(default=0, ge=0)
    cover_image_url:  Optional[str]  = None

class TripUpdate(BaseModel):
    title:            Optional[str]     = None
    location:         Optional[str]     = None
    description:      Optional[str]     = None
    start_date:       Optional[date]    = None
    end_date:         Optional[date]    = None
    max_participants: Optional[int]     = None
    price:            Optional[Decimal] = None
    cover_image_url:  Optional[str]     = None

class TripOut(BaseModel):
    id:               str
    title:            str
    location:         str
    description:      Optional[str]
    host_id:          str
    start_date:       Optional[date]
    end_date:         Optional[date]
    max_participants: int
    price:            Decimal
    cover_image_url:  Optional[str]
    created_at:       datetime

    class Config:
        from_attributes = True


# ─── BOOKINGS ─────────────────────────────────────────────────────
class BookingCreate(BaseModel):
    trip_id: str

class BookingOut(BaseModel):
    id:        str
    user_id:   str
    trip_id:   str
    status:    str
    booked_at: datetime
    trip:      Optional[TripOut] = None

    class Config:
        from_attributes = True
