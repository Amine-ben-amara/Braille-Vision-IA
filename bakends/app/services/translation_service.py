"""Translation service — Liblouis Braille → text translation (future)."""
from __future__ import annotations

from app.schemas.translation import TranslateRequest


async def translate(payload: TranslateRequest) -> dict:
    # TODO: call liblouis with the correct translation table.
    return {"status": "success", "message": "Backend endpoint ready"}