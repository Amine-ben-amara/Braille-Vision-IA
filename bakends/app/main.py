"""FastAPI application entry point."""
from __future__ import annotations

import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.utils.logger import configure_logging
from app.routers import (
    classify,
    history,
    preprocess,
    segment,
    statistics,
    translate,
    upload,
)

configure_logging()
logger = logging.getLogger(settings.app_name)

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description=(
        "Backend architecture for Braille Vision AI. "
        "AI pipeline: OpenCV preprocessing → cell segmentation → "
        "MobileNetV3 classification → Liblouis translation."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    logger.warning("HTTP %s at %s: %s", exc.status_code, request.url.path, exc.detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "message": str(exc.detail)},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    logger.warning("Validation error at %s: %s", request.url.path, exc.errors())
    return JSONResponse(
        status_code=422,
        content={"status": "error", "message": "Validation error", "errors": exc.errors()},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error at %s", request.url.path)
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "Internal server error"},
    )


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("%s v%s starting up", settings.app_name, settings.version)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    logger.info("%s shutting down", settings.app_name)


@app.get("/", tags=["meta"])
def root() -> dict:
    return {
        "status": "success",
        "message": f"{settings.app_name} backend is running",
        "version": settings.version,
        "docs": "/docs",
    }


@app.get("/health", tags=["meta"])
def health() -> dict:
    return {"status": "ok"}


prefix = settings.api_prefix
app.include_router(upload.router, prefix=prefix)
app.include_router(preprocess.router, prefix=prefix)
app.include_router(segment.router, prefix=prefix)
app.include_router(classify.router, prefix=prefix)
app.include_router(translate.router, prefix=prefix)
app.include_router(history.router, prefix=prefix)
app.include_router(statistics.router, prefix=prefix)