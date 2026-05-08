from typing import List
from fastapi import APIRouter, Depends, HTTPException
from .. import schemas
from ..auth import get_current_user
from ..database import get_db

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("", response_model=schemas.BookingOut, status_code=201)
def create_booking(
    body: schemas.BookingCreate,
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM bookings WHERE user_id = %s AND trip_id = %s", (current_user['id'], body.trip_id))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Already booked this trip")

        cur.execute("SELECT id FROM trips WHERE id = %s", (body.trip_id,))
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Trip not found")

        cur.execute(
            "INSERT INTO bookings (user_id, trip_id) VALUES (%s, %s) RETURNING *",
            (current_user['id'], body.trip_id)
        )
        booking = cur.fetchone()
        conn.commit()
        
        # Fetch trip details for the response
        cur.execute("SELECT * FROM trips WHERE id = %s", (body.trip_id,))
        trip = cur.fetchone()
        
        res = dict(booking)
        res['trip'] = dict(trip)
    return res

@router.get("/me", response_model=List[schemas.BookingOut])
def my_bookings(
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute("""
            SELECT b.*, 
                   t.id as t_id, t.title as t_title, t.location as t_location, t.description as t_description, t.host_id as t_host_id, t.start_date as t_start_date, t.end_date as t_end_date, t.max_participants as t_max_participants, t.price as t_price, t.cover_image_url as t_cover_image_url, t.created_at as t_created_at
            FROM bookings b
            JOIN trips t ON b.trip_id = t.id
            WHERE b.user_id = %s
            ORDER BY b.booked_at DESC
        """, (current_user['id'],))
        
        rows = cur.fetchall()
        
        results = []
        for r in rows:
            booking = {k: v for k, v in r.items() if not k.startswith('t_')}
            trip = {k[2:] if k.startswith('t_') else k: v for k, v in r.items() if k.startswith('t_') or k in ['title', 'location', 'description', 'host_id', 'start_date', 'end_date', 'max_participants', 'price', 'cover_image_url']}
            trip['id'] = trip.pop('id', r['t_id'])
            trip['created_at'] = trip.pop('created_at', r['t_created_at'])
            
            booking['trip'] = trip
            results.append(booking)
            
    return results

@router.delete("/{booking_id}", status_code=204)
def cancel_booking(
    booking_id: str,
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute("SELECT user_id FROM bookings WHERE id = %s", (booking_id,))
        booking = cur.fetchone()
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        if str(booking['user_id']) != str(current_user['id']):
            raise HTTPException(status_code=403, detail="Not your booking")
            
        cur.execute("DELETE FROM bookings WHERE id = %s", (booking_id,))
        conn.commit()
