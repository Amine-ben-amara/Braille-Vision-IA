"""Statistics response schema."""
from __future__ import annotations

from pydantic import BaseModel, Field


class StatisticsResponse(BaseModel):
    status: str = "success"
    message: str = "Backend endpoint ready"
    total_documents: int = Field(default=0, ge=0)
    total_characters: int = Field(default=0, ge=0)
    average_confidence: float = Field(default=0.0, ge=0.0, le=1.0)