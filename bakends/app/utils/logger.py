"""Application-wide logging configuration."""
from __future__ import annotations

import logging
from logging.handlers import RotatingFileHandler

from app.config import settings

_LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"


def configure_logging(level: int = logging.INFO) -> logging.Logger:
    """Configure root logging with console + rotating file handler."""
    settings.logs_dir.mkdir(parents=True, exist_ok=True)
    log_file = settings.logs_dir / "backend.log"

    root = logging.getLogger()
    root.setLevel(level)

    # Avoid duplicate handlers on reload
    if getattr(root, "_braille_configured", False):
        return logging.getLogger(settings.app_name)

    formatter = logging.Formatter(_LOG_FORMAT)

    console = logging.StreamHandler()
    console.setFormatter(formatter)
    root.addHandler(console)

    file_handler = RotatingFileHandler(
        log_file, maxBytes=2 * 1024 * 1024, backupCount=5, encoding="utf-8"
    )
    file_handler.setFormatter(formatter)
    root.addHandler(file_handler)

    root._braille_configured = True  # type: ignore[attr-defined]
    return logging.getLogger(settings.app_name)


logger = configure_logging()