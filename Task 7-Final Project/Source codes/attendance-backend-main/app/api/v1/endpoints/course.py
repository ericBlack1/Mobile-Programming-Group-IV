from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.deps import get_admin_user, get_instructor_user, get_current_user
from app.models.user import User
from app.schemas.course import (
    CourseCreate,
    Course as CourseSchema,
    CourseDetail,
    ScheduledClassCreate,
    ScheduledClass as ScheduledClassSchema,
    StudentEnrollmentCreate,
    StudentEnrollment as StudentEnrollmentSchema,
    CourseInstructorCreate,
    CourseInstructor as CourseInstructorSchema
)
from app.services import course as course_service

router = APIRouter()

@router.post("/admin/create-course", response_model=CourseSchema)
async def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Create a new course.
    Only accessible by admin users.
    """
    try:
        return course_service.create_course(
            db=db,
            name=course.name,
            code=course.code
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to create course",
                "message": str(e)
            }
        )

@router.post("/admin/assign-instructor", response_model=CourseInstructorSchema)
async def assign_instructor(
    assignment: CourseInstructorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Assign an instructor to a course.
    Only accessible by admin users.
    """
    try:
        return course_service.assign_instructor(
            db=db,
            course_id=assignment.course_id,
            instructor_id=assignment.instructor_id
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to assign instructor",
                "message": str(e),
                "course_id": assignment.course_id,
                "instructor_id": assignment.instructor_id
            }
        )

@router.post("/instructor/schedule-class", response_model=ScheduledClassSchema)
async def schedule_class(
    scheduled_class: ScheduledClassCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_instructor_user)
):
    """
    Schedule a class session.
    Only accessible by instructors assigned to the course.
    """
    try:
        return course_service.schedule_class(
            db=db,
            course_id=scheduled_class.course_id,
            classroom_id=scheduled_class.classroom_id,
            instructor_id=current_user.id,
            start_time=scheduled_class.start_time,
            duration_minutes=scheduled_class.duration_minutes
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to schedule class",
                "message": str(e),
                "course_id": scheduled_class.course_id,
                "instructor_id": current_user.id
            }
        )

@router.post("/student/enroll", response_model=StudentEnrollmentSchema)
async def enroll_student(
    enrollment: StudentEnrollmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Enroll a student in a scheduled class.
    Students can only enroll themselves.
    """
    # Verify that the current user is the student
    if current_user.role != "student":
        raise HTTPException(
            status_code=403,
            detail={
                "error": "Unauthorized",
                "message": "Only students can enroll in classes",
                "user_id": current_user.id
            }
        )
    
    try:
        return course_service.enroll_student(
            db=db,
            student_id=current_user.id,
            scheduled_class_id=enrollment.scheduled_class_id
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to enroll student",
                "message": str(e),
                "student_id": current_user.id,
                "scheduled_class_id": enrollment.scheduled_class_id
            }
        )

@router.get("/courses", response_model=List[CourseDetail])
async def list_courses(
    db: Session = Depends(get_db)
):
    """
    List all courses with their instructors and scheduled classes.
    Accessible by everyone.
    """
    try:
        return course_service.get_all_courses(db=db)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to fetch courses",
                "message": str(e)
            }
        ) 