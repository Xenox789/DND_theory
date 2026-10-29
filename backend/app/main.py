from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np

app = FastAPI(
    title="DND Study Lab API",
    version="0.1.0",
    description="Backend for interactive Deep Network Development learning simulations."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LinearRegressionRequest(BaseModel):
    x: list[float]
    y: list[float]
    theta0: float
    theta1: float


@app.get("/api/status")
def status():
    return {
        "status": "ok",
        "project": "DND Study Lab",
        "version": "0.1.0",
    }


@app.get("/api/course-outline")
def course_outline():
    return {
        "theory_test_1": {
            "lectures": [1, 2, 3, 4, 5, 6],
            "numpy_practice_weeks": [3, 4, 5, 6],
            "excluded": ["ndarray.strides", "stride tricks"],
        }
    }


@app.post("/api/simulations/linear-regression")
def linear_regression(req: LinearRegressionRequest):
    x = np.asarray(req.x, dtype=float)
    y = np.asarray(req.y, dtype=float)

    if x.shape != y.shape:
        return {"error": "x and y must have matching shapes"}

    predictions = req.theta1 * x + req.theta0
    errors = predictions - y
    loss = float(np.sum(errors ** 2) / (2 * len(x)))

    grad_theta0 = float(np.mean(errors))
    grad_theta1 = float(np.mean(errors * x))

    return {
        "predictions": predictions.tolist(),
        "loss": loss,
        "gradient": {
            "theta0": grad_theta0,
            "theta1": grad_theta1,
        }
    }
