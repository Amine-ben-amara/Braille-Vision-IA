"""Filesystem helpers for uploads and outputs."""
from __future__ import annotations

import re
import time
from pathlib import Path
from uuid import uuid4

from app.config import settings

_SAFE_NAME_RE = re.compile(r"[^A-Za-z0-9._-]+")


def new_document_id() -> str:
    """Generate a unique identifier for a document."""
    return uuid4().hex


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def safe_filename(filename: str) -> str:
    """Return a filesystem-safe filename, preserving the extension."""
    name = Path(filename).name
    cleaned = _SAFE_NAME_RE.sub("_", name).strip("._") or "file"
    return f"{uuid4().hex}_{cleaned}"


def get_extension(filename: str) -> str:
    return Path(filename).suffix.lower().lstrip(".")


def is_allowed_extension(filename: str) -> bool:
    return get_extension(filename) in {e.lower() for e in settings.allowed_extensions}


def validate_file_size(size: int) -> bool:
    return 0 < size <= settings.max_upload_size


def cleanup_old_files(directory: Path, max_age_seconds: int = 24 * 3600) -> int:
    """Delete files in `directory` older than `max_age_seconds`. Returns count removed."""
    if not directory.exists():
        return 0
    now = time.time()
    removed = 0
    for path in directory.iterdir():
        try:
            if path.is_file() and (now - path.stat().st_mtime) > max_age_seconds:
                path.unlink()
                removed += 1
        except OSError:
            continue
    return removed