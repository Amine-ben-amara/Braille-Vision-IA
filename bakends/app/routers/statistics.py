"""Statistics router — aggregated metrics."""
from __future__ import annotations

from fastapi import APIRouter

from app.services import statistics_service

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("")
async def get_statistics() -> dict:
    return await statistics_service.get_statistics()