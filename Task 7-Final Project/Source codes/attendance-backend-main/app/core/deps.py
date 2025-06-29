from typing import List, Optional
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models.user import User, UserRole

def get_current_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> User:
    return current_user

def check_role(required_roles: List[UserRole]):
    """
    Dependency to check if the current user has any of the required roles.
    Usage: @router.get("/", dependencies=[Depends(check_role([UserRole.ADMIN]))])
    """
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Required roles: {[role.value for role in required_roles]}"
            )
        return current_user
    return role_checker

# Predefined role-based dependencies
def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency to ensure the current user is an admin.
    Usage: @router.get("/", dependencies=[Depends(get_admin_user)])
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation requires admin privileges"
        )
    return current_user

def get_instructor_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency to ensure the current user is an instructor or admin.
    Usage: @router.get("/", dependencies=[Depends(get_instructor_user)])
    """
    if current_user.role not in [UserRole.INSTRUCTOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation requires instructor privileges"
        )
    return current_user

def get_student_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency to ensure the current user is a student, instructor, or admin.
    Usage: @router.get("/", dependencies=[Depends(get_student_user)])
    """
    if current_user.role not in [UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operation requires student privileges"
        )
    return current_user 