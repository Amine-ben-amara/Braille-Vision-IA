"""Tests for /api/upload."""
from __future__ import annotations

import io


def test_upload_endpoint(client) -> None:
    files = {"file": ("sample.png", io.BytesIO(b"fake-image-bytes"), "image/png")}
    response = client.post("/api/upload", files=files)
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["message"] == "Backend endpoint ready"


def test_health() -> None:
    from fastapi.testclient import TestClient
    from app.main import app

    with TestClient(app) as client:
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}