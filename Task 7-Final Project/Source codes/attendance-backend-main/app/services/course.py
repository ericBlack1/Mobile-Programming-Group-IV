from datetime import datetime
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from typing import List

from app.models.course import Course, CourseInstructor, ScheduledClass, StudentEnrollment
from app.models.user import User, UserRole

def create_course(db: Session, name: str, code: str) -> Course:
    """Create a new course"""
    # Check if course code already exists
    existing_course = db.query(Course).filter(Course.code == code).first()
    if existing_course:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Course code already exists",
                "message": f"Course with code {code} already exists",
                "code": code
            }
        )
    
    course = Course(name=name, code=code)
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

def assign_instructor(db: Session, course_id: int, instructor_id: int) -> CourseInstructor:
    """Assign an instructor to a course"""
    # Verify instructor exists and has correct role
    instructor = db.query(User).filter(
        User.id == instructor_id,
        User.role == UserRole.INSTRUCTOR
    ).first()
    
    if not instructor:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Instructor not found",
                "message": f"Instructor with ID {instructor_id} not found or not an instructor",
                "instructor_id": instructor_id
            }
        )
    
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Course not found",
                "message": f"Course with ID {course_id} not found",
                "course_id": course_id
            }
        )
    
    # Check if assignment already exists
    existing_assignment = db.query(CourseInstructor).filter(
        CourseInstructor.course_id == course_id,
        CourseInstructor.instructor_id == instructor_id
    ).first()
    
    if existing_assignment:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Assignment already exists",
                "message": f"Instructor {instructor_id} is already assigned to course {course_id}",
                "course_id": course_id,
                "instructor_id": instructor_id
            }
        )
    
    assignment = CourseInstructor(course_id=course_id, instructor_id=instructor_id)
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment

def schedule_class(
    db: Session,
    course_id: int,
    classroom_id: int,
    instructor_id: int,
    start_time: datetime,
    duration_minutes: int
) -> ScheduledClass:
    """Schedule a class session"""
    # Verify instructor is assigned to the course
    instructor_assignment = db.query(CourseInstructor).filter(
        CourseInstructor.course_id == course_id,
        CourseInstructor.instructor_id == instructor_id
    ).first()
    
    if not instructor_assignment:
        raise HTTPException(
            status_code=403,
            detail={
                "error": "Unauthorized",
                "message": f"Instructor {instructor_id} is not assigned to course {course_id}",
                "course_id": course_id,
                "instructor_id": instructor_id
            }
        )
    
    # Create scheduled class
    scheduled_class = ScheduledClass(
        course_id=course_id,
        classroom_id=classroom_id,
        instructor_id=instructor_id,
        start_time=start_time,
        duration_minutes=duration_minutes
    )
    
    db.add(scheduled_class)
    db.commit()
    db.refresh(scheduled_class)
    return scheduled_class

def enroll_student(
    db: Session,
    student_id: int,
    scheduled_class_id: int
) -> StudentEnrollment:
    """Enroll a student in a scheduled class"""
    # Verify student exists and has correct role
    student = db.query(User).filter(
        User.id == student_id,
        User.role == UserRole.STUDENT
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Student not found",
                "message": f"Student with ID {student_id} not found or not a student",
                "student_id": student_id
            }
        )
    
    # Check if scheduled class exists
    scheduled_class = db.query(ScheduledClass).filter(
        ScheduledClass.id == scheduled_class_id
    ).first()
    
    if not scheduled_class:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Scheduled class not found",
                "message": f"Scheduled class with ID {scheduled_class_id} not found",
                "scheduled_class_id": scheduled_class_id
            }
        )
    
    # Check if already enrolled
    existing_enrollment = db.query(StudentEnrollment).filter(
        StudentEnrollment.student_id == student_id,
        StudentEnrollment.scheduled_class_id == scheduled_class_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Already enrolled",
                "message": f"Student {student_id} is already enrolled in class {scheduled_class_id}",
                "student_id": student_id,
                "scheduled_class_id": scheduled_class_id
            }
        )
    
    enrollment = StudentEnrollment(
        student_id=student_id,
        scheduled_class_id=scheduled_class_id
    )
    
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

def verify_student_enrollment(
    db: Session,
    student_id: int,
    scheduled_class_id: int
) -> bool:
    """Verify if a student is enrolled in a scheduled class"""
    enrollment = db.query(StudentEnrollment).filter(
        StudentEnrollment.student_id == student_id,
        StudentEnrollment.scheduled_class_id == scheduled_class_id
    ).first()
    
    return enrollment is not None

def get_all_courses(db: Session) -> List[Course]:
    """Get all courses with their instructors and scheduled classes"""
    return db.query(Course).options(
        joinedload(Course.instructor_assignments).joinedload(CourseInstructor.instructor),
        joinedload(Course.scheduled_classes).joinedload(ScheduledClass.enrollments).joinedload(StudentEnrollment.student)
    ).all() 