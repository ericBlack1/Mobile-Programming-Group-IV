from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_admin_user, get_current_user
from app.models.user import User
from app.models.classroom import Classroom
from app.schemas.classroom import (
    ClassroomCreate,
    Classroom as ClassroomSchema,
    LocationVerificationRequest,
    LocationVerificationResponse
)
from app.services import geofencing

router = APIRouter()

@router.post("/admin/set-class-boundary", response_model=ClassroomSchema)
async def set_class_boundary(
    classroom: ClassroomCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Set or update classroom boundary location.
    Only accessible by admin users.
    """
    try:
        # Create new classroom record
        db_classroom = Classroom(
            name=classroom.name,
            latitude=classroom.latitude,
            longitude=classroom.longitude
        )
        db.add(db_classroom)
        db.commit()
        db.refresh(db_classroom)
        
        return db_classroom
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Failed to set classroom boundary",
                "message": str(e)
            }
        )

@router.post("/student/verify-location", response_model=LocationVerificationResponse)
async def verify_location(
    request: LocationVerificationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Verify if student's current location is within the classroom boundary.
    """
    # Verify that the current user is the student or an admin
    if current_user.role != "admin" and current_user.id != request.student_id:
        raise HTTPException(
            status_code=403,
            detail={
                "error": "Unauthorized",
                "message": "You can only verify your own location",
                "student_id": request.student_id
            }
        )
    
    try:
        # Verify location using geofencing service
        result = geofencing.verify_location(
            db=db,
            classroom_id=request.classroom_id,
            current_lat=request.latitude,
            current_lon=request.longitude
        )
        
        return LocationVerificationResponse(
            status=result["status"],
            distance_meters=result["distance_meters"],
            message=result["message"]
        )
    except HTTPException as e:
        # Re-raise HTTP exceptions to preserve structured error messages
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Location verification failed",
                "message": str(e),
                "student_id": request.student_id,
                "classroom_id": request.classroom_id
            }
        )