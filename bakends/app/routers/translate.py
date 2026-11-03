"""Translation router — Liblouis translation (future)."""
from __future__ import annotations

from fastapi import APIRouter

from app.schemas.translation import TranslateRequest
from app.services import translation_service

router = APIRouter(prefix="/translate", tags=["translate"])


@router.post("")
async def translate_text(payload: TranslateRequest) -> dict:
    return await translation_service.translate(payload)