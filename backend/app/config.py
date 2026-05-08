from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # These should be overridden in production via .env or environment variables
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/solosync"
    SECRET_KEY: str   = "dev-secret-key-please-change-in-production"
    ALGORITHM: str    = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # Comma-separated allowed origins
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    PORT: int = 8000

    @property
    def cors_origins_list(self) -> List[str]:
        # Professional parsing of comma-separated strings
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
