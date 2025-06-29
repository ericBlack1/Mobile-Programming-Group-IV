from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ClassroomBase(BaseModel):
    name: str
    latitude: float = Field(..., ge=-90, le=90, description="Latitude in decimal degrees")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude in decimal degrees")

class ClassroomCreate(ClassroomBase):
    pass

class Classroom(ClassroomBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LocationVerificationRequest(BaseModel):
    student_id: int
    classroom_id: int
    latitude: float = Field(..., ge=-90, le=90, description="Current latitude in decimal degrees")
    longitude: float = Field(..., ge=-180, le=180, description="Current longitude in decimal degrees")

class LocationVerificationResponse(BaseModel):
    status: str
    distance_meters: float
    message: Optional[str] = None 