# Braille Vision AI — Backend (FastAPI)

Production-ready FastAPI backend architecture for the **Braille Vision AI**
project (AI Engineering Internship). The clean structure exposes every route
the frontend needs and reserves clearly named seams for the future AI pipeline.

The AI pipeline (implemented later inside `app/services/*`):

    Upload Image → OpenCV Preprocessing → Braille Cell Segmentation →
    MobileNetV3 Classification → Liblouis Translation → Recognized Text

## Installation

    cd backend
    python -m venv .venv
    source .venv/bin/activate         # Windows: .venv\Scripts\activate
    pip install -r requirements.txt

Optional environment variables (see `app/config.py`):

    MODEL_PATH=app/models/best_model.keras
    UPLOAD_FOLDER=uploads
    OUTPUT_FOLDER=outputs
    LIBLOUIS_TABLE=en-us-g1.ctb
    MAX_UPLOAD_SIZE=15728640

## Run the backend

    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

- API base:  http://localhost:8000/api
- Swagger:   http://localhost:8000/docs
- ReDoc:     http://localhost:8000/redoc
- Health:    http://localhost:8000/health

## Folder structure

    backend/
        app/
            main.py               # FastAPI entry point (CORS, logging, errors)
            config.py             # Pydantic Settings (env vars, paths)
            routers/              # HTTP routers per pipeline stage
            services/             # Business logic (AI to be added later)
            schemas/              # Pydantic request/response models
            models/               # best_model.keras + class_mapping.json
                model_loader.py   # Cached TensorFlow model loader
            utils/                # logger, file_utils, image_utils
        tests/                    # Pytest endpoint tests
        uploads/                  # Uploaded images
        outputs/                  # Generated artifacts
        logs/                     # Rotating backend.log
        requirements.txt
        README.md

## API endpoints

| Method | Path              | Purpose                              |
| ------ | ----------------- | ------------------------------------ |
| GET    | `/health`         | Liveness probe (`{"status":"ok"}`)   |
| POST   | `/api/upload`     | Receive Braille document image       |
| POST   | `/api/preprocess` | OpenCV preprocessing (future)        |
| POST   | `/api/segment`    | Braille cell segmentation (future)   |
| POST   | `/api/classify`   | MobileNetV3 classification (future)  |
| POST   | `/api/translate`  | Liblouis translation (future)        |
| GET    | `/api/history`    | Past recognitions                    |
| GET    | `/api/statistics` | Aggregated statistics                |

All AI endpoints currently return:

    { "status": "success", "message": "Backend endpoint ready" }

### Example — upload

Request:

    curl -X POST http://localhost:8000/api/upload \
         -F "file=@sample.png"

Response:

    { "status": "success", "message": "Backend endpoint ready" }

### Example — translate

Request:

    curl -X POST http://localhost:8000/api/translate \
         -H "Content-Type: application/json" \
         -d '{"braille": "⠓⠑⠇⠇⠕"}'

Response:

    { "status": "success", "message": "Backend endpoint ready" }

## Dependencies

FastAPI, Uvicorn, python-multipart, Pydantic, pydantic-settings,
TensorFlow, OpenCV, NumPy, Pillow, python-louis, scikit-learn,
matplotlib, pandas, pytest.

## Tests

    cd backend
    pytest -q

## Model artifacts

Place the trained artifacts in `app/models/`:

- `best_model.keras`
- `class_mapping.json`

`app/models/model_loader.py` exposes a cached `ModelLoader` with
`predict(image)` and `get_labels()`.