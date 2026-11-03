"""Prediction service — MobileNetV3 Keras classification (future)."""
from __future__ import annotations

from app.schemas.prediction import ClassifyRequest


async def classify(payload: ClassifyRequest) -> dict:
    # TODO: load best_model.keras + class_mapping.json, run inference.
    return {"status": "success", "message": "Backend endpoint ready"}