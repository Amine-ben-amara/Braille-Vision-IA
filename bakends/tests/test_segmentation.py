"""Tests for /api/segment."""
from __future__ import annotations


def test_segment_endpoint(client) -> None:
    response = client.post("/api/segment", json={"document_id": "abc123"})
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["message"] == "Backend endpoint ready"