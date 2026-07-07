from pydantic import BaseModel, Field
from typing import Dict, Any, List

class PredictionResponse(BaseModel):
    prediction: bool
    risk_percentage: float
    confidence_score: float
    probability: float
    recommendation: str
    model_version: str
    prediction_time: str
    explanation: Dict[str, Any]

class DiabetesRequest(BaseModel):
    preg: float = Field(..., alias="preg")
    plas: float = Field(..., alias="plas")
    pres: float = Field(..., alias="pres")
    skin: float = Field(..., alias="skin")
    insu: float = Field(..., alias="insu")
    mass: float = Field(..., alias="mass")
    pedi: float = Field(..., alias="pedi")
    age: float = Field(..., alias="age")

class HeartRequest(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

class GenericRequest(BaseModel):
    features: Dict[str, float]

class HealthScoreRequest(BaseModel):
    bmi: float
    blood_pressure_sys: float
    blood_pressure_dia: float
    fasting_blood_sugar: float
    heart_rate: float
    age: float
    activity_level: str
    smoking_status: str
    alcohol_use: str

class HealthScoreResponse(BaseModel):
    overall_score: float
    health_grade: str
    risk_category: str
    details: Dict[str, str]
