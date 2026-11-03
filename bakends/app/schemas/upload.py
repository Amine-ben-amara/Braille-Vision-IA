"""Schemas for upload / preprocess stages."""
from __future__ import annotations

from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    status: str = Field(default="success")
    message: str = Field(default="Backend endpoint ready")
    document_id: str | None = None
    filename: str | None = None
    size: int | None = Field(default=None, ge=0)
    content_type: str | None = None


class PreprocessRequest(BaseModel):
    document_id: str = Field(..., min_length=1, description="Identifier returned by /upload")


class PreprocessResponse(BaseModel):
    status: str = "success"
    message: str = "Backend endpoint ready"
    document_id: str | None = None