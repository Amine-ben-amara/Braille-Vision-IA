"""Classification router — MobileNetV3 classification (future)."""
from __future__ import annotations

from fastapi import APIRouter

from app.schemas.prediction import ClassifyRequest
from app.services import prediction_service

router = APIRouter(prefix="/classify", tags=["classify"])


@router.post("")
async def classify_cells(payload: ClassifyRequest) -> dict:
    return await prediction_service.classify(payload)