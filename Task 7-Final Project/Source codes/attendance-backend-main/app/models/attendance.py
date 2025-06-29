from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base

class StudentEmbedding(Base):
    __tablename__ = "student_embeddings"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    embedding = Column(ARRAY(Float), nullable=False)  # Store the facial embedding vector
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship with User model
    student = relationship("User", back_populates="embeddings")

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    check_in_time = Column(DateTime(timezone=True), server_default=func.now())
    confidence_score = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # "verified" or "failed"

    # Relationship with User model
    student = relationship("User", back_populates="attendance_records") 