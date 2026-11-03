"""Preprocess router — OpenCV preprocessing stage (future)."""
from __future__ import annotations

from fastapi import APIRouter

from app.schemas.upload import PreprocessRequest
from app.services import preprocess_service

router = APIRouter(prefix="/preprocess", tags=["preprocess"])


@router.post("")
async def preprocess_image(payload: PreprocessRequest) -> dict:
    return await preprocess_service.preprocess(payload)