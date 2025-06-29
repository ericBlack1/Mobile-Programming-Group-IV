from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated

from app.core.database import get_db
from app.core.deps import get_admin_user, get_current_user
from app.models.user import User
from app.schemas.attendance import VerificationResponse
from app.services import face_recognition as face_service

router = APIRouter()

@router.post("/admin/upload-face")
async def upload_face(
    student_id: Annotated[int, Form()],
    face_image: Annotated[UploadFile, File()],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Upload a student's face image and store the embedding.
    Only accessible by admin users.
    """
    # Save uploaded file
    image_path = await face_service.save_upload_file(face_image)
    
    try:
        # Extract face embedding
        embedding = face_service.extract_face_embedding(image_path)
        
        # Store embedding
        stored_embedding = await face_service.store_student_embedding(
            db=db,
            student_id=student_id,
            embedding=embedding
        )
        
        return {
            "message": "Face embedding stored successfully",
            "student_id": student_id
        }
    except HTTPException as e:
        # Re-raise the HTTPException to preserve the structured error message
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Unexpected error",
                "message": str(e),
                "student_id": student_id
            }
        )

@router.post("/student/check-in", response_model=VerificationResponse)
async def check_in(
    student_id: Annotated[int, Form()],
    face_image: Annotated[UploadFile, File()],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Verify student's face and log attendance.
    """
    # Verify that the current user is the student or an admin
    if current_user.role != "admin" and current_user.id != student_id:
        raise HTTPException(
            status_code=403,
            detail={
                "error": "Unauthorized",
                "message": "You can only check in for yourself",
                "student_id": student_id
            }
        )
    
    # Save uploaded file
    image_path = await face_service.save_upload_file(face_image)
    
    try:
        # Verify face
        is_verified, confidence = await face_service.verify_student_face(
            db=db,
            student_id=student_id,
            image_path=image_path
        )
        
        # Log attendance
        status = "verified" if is_verified else "failed"
        if is_verified:
            await face_service.log_attendance(
                db=db,
                student_id=student_id,
                confidence=confidence,
                status=status
            )
        
        return VerificationResponse(
            status=status,
            confidence=confidence,
            student_id=student_id,
            message="Face verified successfully" if is_verified else "Face verification failed"
        )
    except HTTPException as e:
        # Re-raise the HTTPException to preserve the structured error message
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Unexpected error",
                "message": str(e),
                "student_id": student_id
            }
        ) 