"""History router — past recognitions."""
from __future__ import annotations

from fastapi import APIRouter

from app.services import history_service

router = APIRouter(prefix="/history", tags=["history"])


@router.get("")
async def get_history() -> dict:
    return await history_service.list_history()