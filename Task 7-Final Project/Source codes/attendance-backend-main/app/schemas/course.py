from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    name: str
    code: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class InstructorInfo(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True

class StudentInfo(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True

class StudentEnrollmentBase(BaseModel):
    scheduled_class_id: int

class StudentEnrollmentCreate(StudentEnrollmentBase):
    pass

class StudentEnrollment(StudentEnrollmentBase):
    id: int
    student_id: int
    created_at: datetime
    student: StudentInfo

    class Config:
        from_attributes = True

class ScheduledClassInfo(BaseModel):
    id: int
    classroom_id: int
    start_time: datetime
    duration_minutes: int
    instructor_id: int
    enrollments: List[StudentEnrollment]

    class Config:
        from_attributes = True

class CourseInstructorInfo(BaseModel):
    instructor: InstructorInfo

    class Config:
        from_attributes = True

class CourseDetail(Course):
    instructor_assignments: List[CourseInstructorInfo]
    scheduled_classes: List[ScheduledClassInfo]

    class Config:
        from_attributes = True

class ScheduledClassBase(BaseModel):
    course_id: int
    classroom_id: int
    start_time: datetime
    duration_minutes: int = Field(..., gt=0, description="Duration in minutes")

class ScheduledClassCreate(ScheduledClassBase):
    pass

class ScheduledClass(ScheduledClassBase):
    id: int
    instructor_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class CourseInstructorBase(BaseModel):
    course_id: int
    instructor_id: int

class CourseInstructorCreate(CourseInstructorBase):
    pass

class CourseInstructor(CourseInstructorBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True 