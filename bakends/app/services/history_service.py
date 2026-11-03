"""History service — persistence of past recognitions (future)."""
from __future__ import annotations


async def list_history() -> dict:
    # TODO: read persisted recognitions from storage.
    return {"status": "success", "message": "Backend endpoint ready"}