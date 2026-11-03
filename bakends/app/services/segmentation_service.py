"""Segmentation service — Braille cell segmentation (future)."""
from __future__ import annotations

from app.schemas.prediction import SegmentRequest


async def segment(payload: SegmentRequest) -> dict:
    # TODO: detect dots, group into 2x3 Braille cells.
    return {"status": "success", "message": "Backend endpoint ready"}