"""Tests for /api/classify."""
from __future__ import annotations


def test_classify_endpoint(client) -> None:
    response = client.post("/api/classify", json={"document_id": "abc123"})
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["message"] == "Backend endpoint ready"