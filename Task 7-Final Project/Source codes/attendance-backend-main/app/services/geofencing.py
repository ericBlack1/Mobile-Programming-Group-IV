from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.classroom import Classroom

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the distance between two points using the Haversine formula.
    Returns distance in meters.
    """
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    
    # Earth's radius in meters
    radius = 6371000
    
    # Calculate distance in meters
    distance = radius * c
    return distance

def get_classroom_location(db: Session, classroom_id: int) -> Classroom:
    """Get classroom location from database"""
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not classroom:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "Classroom not found",
                "message": f"Classroom with ID {classroom_id} does not exist",
                "classroom_id": classroom_id
            }
        )
    return classroom

def verify_location(
    db: Session,
    classroom_id: int,
    current_lat: float,
    current_lon: float,
    max_distance_meters: float = 20.0
) -> dict:
    """
    Verify if a location is within the specified distance of a classroom.
    Returns a dictionary with status and distance information.
    """
    # Get classroom location
    classroom = get_classroom_location(db, classroom_id)
    
    # Calculate distance
    distance = calculate_distance(
        classroom.latitude,
        classroom.longitude,
        current_lat,
        current_lon
    )
    
    # Determine if within range
    is_within_range = distance <= max_distance_meters
    
    return {
        "status": "within_range" if is_within_range else "out_of_range",
        "distance_meters": round(distance, 2),
        "message": (
            f"Location is within {max_distance_meters}m of classroom"
            if is_within_range
            else f"Location is {round(distance, 2)}m away from classroom (max allowed: {max_distance_meters}m)"
        )
    } 