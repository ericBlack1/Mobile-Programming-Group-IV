from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    PROJECT_NAME: str = "Attendance Backend"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "A modern FastAPI project with SQLAlchemy and PostgreSQL"
    API_V1_STR: str = "/api/v1"
    
    # CORS Configuration
    CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database Configuration
    POSTGRES_SERVER: str = "dpg-d1gqokumcj7s73d4st0g-a.oregon-postgres.render.com"
    POSTGRES_USER: str = "attendance_0n1x_user"
    POSTGRES_PASSWORD: str = "fQ3bNpFpldK6HxxjWtX3LWzRPF50LWKd"
    POSTGRES_DB: str = "attendance_0n1x"
    SQLALCHEMY_DATABASE_URI: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}"

    # JWT Configuration
    SECRET_KEY: str = "my-secure-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
