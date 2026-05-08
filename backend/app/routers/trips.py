from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas
from ..auth import get_current_user, require_host
from ..database import get_db

router = APIRouter(prefix="/trips", tags=["trips"])

@router.get("", response_model=List[schemas.TripOut])
def list_trips(skip: int = 0, limit: int = 50, conn = Depends(get_db)):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM trips ORDER BY created_at DESC OFFSET %s LIMIT %s", (skip, limit))
        trips = cur.fetchall()
    return [dict(t) for t in trips]

@router.get("/{trip_id}", response_model=schemas.TripOut)
def get_trip(trip_id: str, conn = Depends(get_db)):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM trips WHERE id = %s", (trip_id,))
        trip = cur.fetchone()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return dict(trip)

@router.post("", response_model=schemas.TripOut, status_code=201)
def create_trip(
    body: schemas.TripCreate,
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO trips (title, location, description, host_id, start_date, end_date, max_participants, price, cover_image_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *
            """,
            (body.title, body.location, body.description, current_user['id'], body.start_date, body.end_date, body.max_participants, body.price, body.cover_image_url)
        )
        trip = cur.fetchone()
        conn.commit()
    return dict(trip)

@router.put("/{trip_id}", response_model=schemas.TripOut)
def update_trip(
    trip_id: str,
    body: schemas.TripUpdate,
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM trips WHERE id = %s", (trip_id,))
        trip = cur.fetchone()
        
        if not trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        if str(trip['host_id']) != str(current_user['id']):
            raise HTTPException(status_code=403, detail="Not your trip")
            
        update_data = body.model_dump(exclude_none=True)
        if not update_data:
            return dict(trip)
            
        set_clause = ", ".join([f"{k} = %s" for k in update_data.keys()])
        values = list(update_data.values())
        values.append(trip_id)
        
        cur.execute(f"UPDATE trips SET {set_clause} WHERE id = %s RETURNING *", values)
        updated_trip = cur.fetchone()
        conn.commit()
        
    return dict(updated_trip)

@router.delete("/{trip_id}", status_code=204)
def delete_trip(
    trip_id: str,
    current_user: dict = Depends(get_current_user),
    conn = Depends(get_db),
):
    with conn.cursor() as cur:
        cur.execute("SELECT host_id FROM trips WHERE id = %s", (trip_id,))
        trip = cur.fetchone()
        if not trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        if str(trip['host_id']) != str(current_user['id']):
            raise HTTPException(status_code=403, detail="Not your trip")
            
        cur.execute("DELETE FROM trips WHERE id = %s", (trip_id,))
        conn.commit()
