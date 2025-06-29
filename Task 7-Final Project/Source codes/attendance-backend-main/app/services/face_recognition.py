import os
import numpy as np
from typing import Optional, Tuple
from deepface import DeepFace
from scipy.spatial.distance import cosine
from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException
import tempfile
import shutil

from app.models.attendance import StudentEmbedding, Attendance
from app.models.user import User

async def save_upload_file(upload_file: UploadFile) -> str:
    """Save uploaded file temporarily and return the path"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            with open(temp_file.name, "wb") as buffer:
                shutil.copyfileobj(upload_file.file, buffer)
            return temp_file.name
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error saving file: {str(e)}")
    finally:
        upload_file.file.close()

def extract_face_embedding(image_path: str) -> np.ndarray:
    """Extract face embedding using DeepFace"""
    try:
        # Use Facenet model for face recognition
        embedding = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            enforce_detection=True
        )
        return np.array(embedding[0]['embedding'])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"No face detected or error processing image: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(image_path):
            os.unlink(image_path)

def calculate_similarity(embedding1: np.ndarray, embedding2: np.ndarray) -> float:
    """Calculate cosine similarity between two embeddings"""
    return 1 - cosine(embedding1, embedding2)

async def store_student_embedding(
    db: Session,
    student_id: int,
    embedding: np.ndarray
) -> StudentEmbedding:
    """Store student's face embedding in the database"""
    # Check if student exists
    student = db.query(User).filter(User.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Create or update embedding
    db_embedding = db.query(StudentEmbedding).filter(
        StudentEmbedding.student_id == student_id
    ).first()

    if db_embedding:
        db_embedding.embedding = embedding.tolist()
    else:
        db_embedding = StudentEmbedding(
            student_id=student_id,
            embedding=embedding.tolist()
        )
        db.add(db_embedding)

    db.commit()
    db.refresh(db_embedding)
    return db_embedding

async def verify_student_face(
    db: Session,
    student_id: int,
    image_path: str
) -> Tuple[bool, float]:
    """Verify student's face against stored embedding"""
    # Get stored embedding
    stored_embedding = db.query(StudentEmbedding).filter(
        StudentEmbedding.student_id == student_id
    ).first()

    if not stored_embedding:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "No face embedding found",
                "message": f"Student ID {student_id} has not registered their face yet. Please register your face first.",
                "student_id": student_id
            }
        )

    try:
        # Extract face embedding from uploaded image
        current_embedding = extract_face_embedding(image_path)
    except HTTPException as e:
        if "No face detected" in str(e.detail):
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "No face detected",
                    "message": "No face was detected in the uploaded image. Please ensure the image contains a clear face.",
                    "student_id": student_id
                }
            )
        raise e

    # Calculate similarity
    similarity = calculate_similarity(
        np.array(stored_embedding.embedding),
        current_embedding
    )

    if similarity < 0.90:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Face verification failed",
                "message": f"Face verification failed. The uploaded face does not match the registered face for student ID {student_id}.",
                "confidence_score": float(similarity),
                "threshold": 0.90,
                "student_id": student_id
            }
        )

    return True, similarity

async def log_attendance(
    db: Session,
    student_id: int,
    confidence: float,
    status: str
) -> Attendance:
    """Log attendance record"""
    # Convert NumPy float to Python native float
    confidence_float = float(confidence)
    
    attendance = Attendance(
        student_id=student_id,
        confidence_score=confidence_float,
        status=status
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance 