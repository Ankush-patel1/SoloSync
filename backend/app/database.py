import psycopg2
from psycopg2.extras import RealDictCursor
from .config import settings

def get_db():
    # settings.DATABASE_URL typically looks like postgresql://user:pass@host/db
    conn = psycopg2.connect(settings.DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        yield conn
    finally:
        conn.close()
