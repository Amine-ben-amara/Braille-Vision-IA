"""Upload service — persistence of incoming Braille document images."""
from __future__ import annotations

from fastapi import UploadFile


async def handle_upload(file: UploadFile) -> dict:
    # TODO: validate mime type, size, persist to `uploads/`, return an id.
    return {"status": "success", "message": "Backend endpoint ready"}