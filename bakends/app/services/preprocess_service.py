"""Preprocess service — OpenCV preprocessing pipeline (future)."""
from __future__ import annotations

from app.schemas.upload import PreprocessRequest


async def preprocess(payload: PreprocessRequest) -> dict:
    # TODO: grayscale, denoise, threshold, deskew via OpenCV.
    return {"status": "success", "message": "Backend endpoint ready"}