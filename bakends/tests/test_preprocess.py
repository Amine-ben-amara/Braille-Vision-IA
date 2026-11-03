"""Tests for /api/preprocess."""
from __future__ import annotations


def test_preprocess_endpoint(client) -> None:
    response = client.post("/api/preprocess", json={"document_id": "abc123"})
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["message"] == "Backend endpoint ready"


def test_preprocess_requires_document_id(client) -> None:
    response = client.post("/api/preprocess", json={})
    assert response.status_code == 422