"""Schemas for segmentation and classification stages."""
from __future__ import annotations

from pydantic import BaseModel, Field


class SegmentRequest(BaseModel):
    document_id: str = Field(..., min_length=1, description="Identifier of the preprocessed document")


class SegmentResponse(BaseModel):
    status: str = "success"
    message: str = "Backend endpoint ready"
    document_id: str | None = None
    cells: int | None = Field(default=None, ge=0)


class ClassifyRequest(BaseModel):
    document_id: str = Field(..., min_length=1, description="Identifier of the segmented document")


class ClassifiedCharacter(BaseModel):
    cell: int = Field(..., ge=0)
    letter: str = Field(..., min_length=1, max_length=8)
    confidence: float = Field(..., ge=0.0, le=1.0)


class ClassifyResponse(BaseModel):
    status: str = "success"
    message: str = "Backend endpoint ready"
    characters: list[ClassifiedCharacter] = []