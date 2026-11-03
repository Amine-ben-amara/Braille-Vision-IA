"""Model loader for MobileNetV3 Braille classifier.

Loads TensorFlow model + class mapping lazily, caches them for reuse.
No training logic. No inference algorithm details — only I/O + prediction call.
"""
from __future__ import annotations

import json
import logging
import threading
from pathlib import Path
from typing import Any

from app.config import settings

logger = logging.getLogger(__name__)


class ModelLoader:
    """Singleton-style loader for the trained Keras model and class mapping."""

    _instance: "ModelLoader | None" = None
    _lock = threading.Lock()

    def __new__(cls) -> "ModelLoader":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._model = None
                    cls._instance._labels = None
        return cls._instance

    @property
    def model_path(self) -> Path:
        return settings.model_path

    @property
    def class_mapping_path(self) -> Path:
        return settings.class_mapping_path

    def _load_model(self) -> Any:
        if self._model is not None:
            return self._model
        if not self.model_path.exists():
            logger.warning("Model file not found at %s", self.model_path)
            return None
        try:
            from tensorflow.keras.models import load_model  # type: ignore
        except Exception as exc:  # pragma: no cover
            logger.error("TensorFlow not available: %s", exc)
            return None
        logger.info("Loading Keras model from %s", self.model_path)
        self._model = load_model(str(self.model_path))
        return self._model

    def _load_labels(self) -> dict[int, str]:
        if self._labels is not None:
            return self._labels
        if not self.class_mapping_path.exists():
            logger.warning("Class mapping not found at %s", self.class_mapping_path)
            self._labels = {}
            return self._labels
        with self.class_mapping_path.open("r", encoding="utf-8") as fp:
            raw = json.load(fp)
        # Normalize keys to int when possible
        self._labels = {int(k) if str(k).isdigit() else k: v for k, v in raw.items()}
        return self._labels

    def get_labels(self) -> dict[int, str]:
        """Return cached class-index -> label mapping."""
        return self._load_labels()

    def predict(self, image: Any) -> Any:
        """Run a forward pass on the given preprocessed image tensor/array.

        The AI pipeline (preprocessing + segmentation) is implemented elsewhere.
        This method only wraps the cached model's `predict` call.
        """
        model = self._load_model()
        if model is None:
            raise RuntimeError("Model is not available. Place best_model.keras in app/models/.")
        return model.predict(image)


model_loader = ModelLoader()