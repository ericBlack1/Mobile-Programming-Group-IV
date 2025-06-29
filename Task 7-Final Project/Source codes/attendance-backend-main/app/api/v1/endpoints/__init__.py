from fastapi import APIRouter
from app.api.v1.endpoints import users, auth, attendance, classroom, course

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["authentication"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
router.include_router(classroom.router, prefix="/classroom", tags=["classroom"])
router.include_router(course.router, prefix="/course", tags=["course"]) 