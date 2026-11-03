"""Upload router — receives Braille document images."""
from __future__ import annotations

from fastapi import APIRouter, File, UploadFile

from app.services import upload_service

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("")
async def upload_image(file: UploadFile = File(...)) -> dict:
    """Receive an uploaded Braille document image."""
    return await upload_service.handle_upload(file)