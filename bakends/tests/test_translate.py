"""Tests for /api/translate."""
from __future__ import annotations


def test_translate_endpoint(client) -> None:
    response = client.post("/api/translate", json={"braille": "⠓⠑⠇⠇⠕"})
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert body["message"] == "Backend endpoint ready"


def test_translate_requires_payload(client) -> None:
    response = client.post("/api/translate", json={})
    assert response.status_code == 422