import tensorflow as tf
import json
import numpy as np

MODEL_PATH = "app/models/best_model_finetuned.keras"
MAPPING_PATH = "app/models/class_mapping.json"

model = tf.keras.models.load_model(MODEL_PATH)

with open(MAPPING_PATH, "r") as f:
    class_mapping = json.load(f)

def predict(image):
    prediction = model.predict(np.expand_dims(image, axis=0), verbose=0)
    index = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    return {
        "class": class_mapping[str(index)],
        "confidence": confidence
    }