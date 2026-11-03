"""Schemas for translation stage."""
from __future__ import annotations

from pydantic import BaseModel, Field


class TranslateRequest(BaseModel):
    document_id: str | None = Field(default=None, min_length=1)
    braille: str | None = Field(default=None, min_length=1, description="Raw Braille payload")

    def model_post_init(self, _ctx) -> None:  # type: ignore[override]
        if not self.document_id and not self.braille:
            raise ValueError("Either 'document_id' or 'braille' must be provided.")


class TranslateResponse(BaseModel):
    status: str = "success"
    message: str = "Backend endpoint ready"
    text: str | None = None