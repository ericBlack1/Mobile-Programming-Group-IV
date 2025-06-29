from sqlalchemy.orm import Session

from app.core.database import Base, engine
from app.models.user import User
from app.models.attendance import StudentEmbedding, Attendance

def init_db() -> None:
    # Create all tables
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    print("Creating database tables...")
    init_db()
    print("Database tables created successfully!") 