"""Segmentation router — Braille cell segmentation (future)."""
from __future__ import annotations

from fastapi import APIRouter

from app.schemas.prediction import SegmentRequest
from app.services import segmentation_service

router = APIRouter(prefix="/segment", tags=["segment"])


@router.post("")
async def segment_document(payload: SegmentRequest) -> dict:
    return await segmentation_service.segment(payload)