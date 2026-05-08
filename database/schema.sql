-- SoloSync PostgreSQL Schema
-- Run: psql -U postgres -d solosync -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── USERS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             VARCHAR(100)    NOT NULL,
    email            VARCHAR(255)    UNIQUE NOT NULL,
    hashed_password  TEXT            NOT NULL,
    role             VARCHAR(20)     NOT NULL DEFAULT 'traveler'
                                     CHECK (role IN ('traveler', 'host')),
    is_verified      BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ─── TRIPS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trips (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title            VARCHAR(200)    NOT NULL,
    location         VARCHAR(200)    NOT NULL,
    description      TEXT,
    host_id          UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date       DATE,
    end_date         DATE,
    max_participants INT             NOT NULL DEFAULT 10 CHECK (max_participants > 0),
    price            NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (price >= 0),
    cover_image_url  TEXT,
    created_at       TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_host    ON trips(host_id);
CREATE INDEX IF NOT EXISTS idx_trips_created ON trips(created_at DESC);

-- ─── BOOKINGS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID         NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    trip_id    UUID         NOT NULL REFERENCES trips(id)  ON DELETE CASCADE,
    status     VARCHAR(20)  NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    booked_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, trip_id)
);

CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip ON bookings(trip_id);
