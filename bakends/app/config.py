"""Application configuration loaded from environment variables."""
from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    """Runtime settings backed by environment variables / .env."""

    app_name: str = "Braille Vision AI"
    api_prefix: str = "/api"
    version: str = "0.1.0"
    debug: bool = False

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ]

    base_dir: Path = BASE_DIR

    upload_folder: Path = BASE_DIR / "uploads"
    output_folder: Path = BASE_DIR / "outputs"
    models_dir: Path = BASE_DIR / "app" / "models"
    logs_dir: Path = BASE_DIR / "logs"

    model_path: Path = BASE_DIR / "app" / "models" / "best_model.keras"
    class_mapping_path: Path = BASE_DIR / "app" / "models" / "class_mapping.json"

    liblouis_table: str = "en-us-g1.ctb"

    max_upload_size: int = 15 * 1024 * 1024  # bytes
    allowed_extensions: list[str] = ["png", "jpg", "jpeg", "bmp", "tiff", "tif"]
    allowed_image_types: list[str] = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/bmp",
        "image/tiff",
    ]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

for directory in (
    settings.upload_folder,
    settings.output_folder,
    settings.models_dir,
    settings.logs_dir,
):
    directory.mkdir(parents=True, exist_ok=True)