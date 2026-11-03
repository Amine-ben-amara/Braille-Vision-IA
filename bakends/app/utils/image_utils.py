"""Image helpers (OpenCV utilities will live here)."""
from __future__ import annotations

from pathlib import Path

from app.config import settings


def is_allowed_content_type(content_type: str | None) -> bool:
    return bool(content_type) and content_type in settings.allowed_image_types


def validate_image_file(filename: str, content_type: str | None, size: int) -> tuple[bool, str]:
    """Basic validation: extension, mime type, size. Returns (ok, message)."""
    from app.utils.file_utils import is_allowed_extension, validate_file_size

    if not is_allowed_extension(filename):
        return False, f"Unsupported file extension: {filename}"
    if not is_allowed_content_type(content_type):
        return False, f"Unsupported content type: {content_type}"
    if not validate_file_size(size):
        return False, f"File size {size} bytes exceeds limit {settings.max_upload_size}"
    return True, "ok"


def image_placeholder(path: Path) -> Path:
    """Placeholder — real OpenCV helpers to be implemented later."""
    return path