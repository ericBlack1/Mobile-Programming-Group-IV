from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Interval
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    scheduled_classes = relationship("ScheduledClass", back_populates="course")
    instructor_assignments = relationship("CourseInstructor", back_populates="course")

class CourseInstructor(Base):
    __tablename__ = "course_instructors"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    instructor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    course = relationship("Course", back_populates="instructor_assignments")
    instructor = relationship("User")

class ScheduledClass(Base):
    __tablename__ = "scheduled_classes"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    instructor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    course = relationship("Course", back_populates="scheduled_classes")
    classroom = relationship("Classroom")
    instructor = relationship("User")
    enrollments = relationship("StudentEnrollment", back_populates="scheduled_class")

class StudentEnrollment(Base):
    __tablename__ = "student_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_class_id = Column(Integer, ForeignKey("scheduled_classes.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    student = relationship("User")
    scheduled_class = relationship("ScheduledClass", back_populates="enrollments") 