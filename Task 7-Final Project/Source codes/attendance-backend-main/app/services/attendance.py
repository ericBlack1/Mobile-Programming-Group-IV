import shutil
from fastapi import HTTPException
from pathlib import Path
from fastapi import UploadFile

async def save_upload_file(upload_file: UploadFile, destination: Path) -> Path:
    """Save an uploaded file to the specified destination."""
    try:
        # Create directory if it doesn't exist
        destination.parent.mkdir(parents=True, exist_ok=True)
        
        # Save the file using FastAPI's built-in file handling
        with open(destination, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
            
        return destination
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error saving file: {str(e)}"
        )
    finally:
        upload_file.file.close() 