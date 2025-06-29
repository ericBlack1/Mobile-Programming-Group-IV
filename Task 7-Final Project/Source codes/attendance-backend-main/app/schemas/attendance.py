from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class AttendanceBase(BaseModel):
    student_id: int
    confidence_score: float
    status: str

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int
    check_in_time: datetime

    class Config:
        from_attributes = True

class VerificationResponse(BaseModel):
    status: str
    confidence: float
    student_id: int
    message: Optional[str] = None 