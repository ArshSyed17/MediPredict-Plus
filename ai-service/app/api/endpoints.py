from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from app.schemas.schemas import DiabetesRequest, HeartRequest, GenericRequest, PredictionResponse
from app.models.model_loader import ModelLoader
from app.core.config import settings
import time
import uuid

router = APIRouter()

# Instantiate the model loader.
# Note: models will be loaded on demand or at startup.
loader = ModelLoader(settings.MODELS_DIR)

def get_prediction(disease: str, features: Dict[str, float]) -> PredictionResponse:
    start_time = time.time()
    
    # Check model presence
    model_data = loader.load_model(disease)
    if not model_data:
        raise HTTPException(status_code=503, detail=f"Model for {disease} is currently unavailable.")
        
    clf = model_data["model"]
    scaler = model_data["scaler"]
    metadata = model_data["metadata"]
    expected_features = metadata.get("features", [])
    
    # Build input array based on expected feature order
    import numpy as np
    try:
        input_array = np.array([features[f] for f in expected_features]).reshape(1, -1)
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing feature in request: {str(e)}")
        
    # Scale and predict
    scaled_input = scaler.transform(input_array)
    pred_class = int(clf.predict(scaled_input)[0])
    
    # Get probability
    if hasattr(clf, "predict_proba"):
        prob = float(clf.predict_proba(scaled_input)[0][1])
    else:
        prob = 1.0 if pred_class == 1 else 0.0
        
    risk_percentage = round(prob * 100, 2)
    confidence_score = round(max(prob, 1 - prob) * 100, 2)
    
    # Compute dummy SHAP for now (real SHAP will be in shap_explainer)
    # SHAP logic can be integrated directly via the shap library
    import shap
    try:
        explainer = shap.TreeExplainer(clf)
        shap_values = explainer.shap_values(scaled_input)
        
        # Structure the explanation
        feature_importance = {}
        if isinstance(shap_values, list): # For multiclass output sometimes returned by XGBoost
            shap_values = shap_values[1]
        
        for idx, feat_name in enumerate(expected_features):
            feature_importance[feat_name] = float(shap_values[0][idx])
            
        # Top 3 features
        top_features = sorted(feature_importance.items(), key=lambda x: abs(x[1]), reverse=True)[:3]
        
        explanation = {
            "top_features": [{"feature": k, "impact": v} for k, v in top_features],
            "feature_importance": feature_importance,
            "summary": f"The model prediction was heavily influenced by {top_features[0][0]} and {top_features[1][0]}."
        }
    except Exception as e:
        explanation = {"summary": "SHAP explanation not available.", "error": str(e)}

    elapsed_time = f"{(time.time() - start_time) * 1000:.2f}ms"
    
    recommendation = "Consult a healthcare professional for personalized advice."
    if risk_percentage > 70:
        recommendation = "High risk detected. Immediate medical consultation is highly recommended."
    elif risk_percentage > 40:
        recommendation = "Moderate risk. Please schedule a follow-up test and maintain a healthy lifestyle."

    return PredictionResponse(
        prediction=bool(pred_class),
        risk_percentage=risk_percentage,
        confidence_score=confidence_score,
        probability=prob,
        recommendation=recommendation,
        model_version=metadata.get("version", "unknown"),
        prediction_time=elapsed_time,
        explanation=explanation
    )

@router.post("/predict/diabetes", response_model=PredictionResponse)
async def predict_diabetes(req: DiabetesRequest):
    return get_prediction("diabetes", req.dict())

@router.post("/predict/heart", response_model=PredictionResponse)
async def predict_heart(req: HeartRequest):
    return get_prediction("heart", req.dict())

@router.post("/predict/ckd", response_model=PredictionResponse)
async def predict_ckd(req: GenericRequest):
    return get_prediction("ckd", req.features)

@router.post("/predict/stroke", response_model=PredictionResponse)
async def predict_stroke(req: GenericRequest):
    return get_prediction("stroke", req.features)

@router.post("/predict/liver", response_model=PredictionResponse)
async def predict_liver(req: GenericRequest):
    return get_prediction("liver", req.features)

@router.post("/predict/hypertension", response_model=PredictionResponse)
async def predict_hypertension(req: GenericRequest):
    return get_prediction("hypertension", req.features)

from app.schemas.schemas import DiabetesRequest, HeartRequest, GenericRequest, PredictionResponse, HealthScoreRequest, HealthScoreResponse
from app.services.health_engine import calculate_health_score

@router.post("/health-score", response_model=HealthScoreResponse)
async def generate_health_score(req: HealthScoreRequest):
    return calculate_health_score(req)

# Health endpoints
@router.get("/health")
async def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}

@router.get("/ready")
async def readiness_check():
    status = loader.get_all_models_status()
    all_ready = all([s.get("loaded", False) for s in status.values()])
    if not all_ready:
        return {"status": "not ready", "models": status}
    return {"status": "ready"}

@router.get("/models")
async def models_status():
    return loader.get_all_models_status()
