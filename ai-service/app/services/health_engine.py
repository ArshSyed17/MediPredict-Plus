from app.schemas.schemas import HealthScoreRequest, HealthScoreResponse

def calculate_health_score(data: HealthScoreRequest) -> HealthScoreResponse:
    score = 100.0
    details = {}
    
    # BMI logic
    if data.bmi < 18.5:
        score -= 5
        details['bmi'] = "Underweight"
    elif data.bmi > 25 and data.bmi <= 30:
        score -= 10
        details['bmi'] = "Overweight"
    elif data.bmi > 30:
        score -= 20
        details['bmi'] = "Obese"
    else:
        details['bmi'] = "Normal"
        
    # Blood Pressure logic
    if data.blood_pressure_sys > 130 or data.blood_pressure_dia > 85:
        score -= 15
        details['blood_pressure'] = "High"
    else:
        details['blood_pressure'] = "Normal"
        
    # Lifestyle logic
    if data.smoking_status.lower() in ["current", "yes"]:
        score -= 15
        details['smoking'] = "Smoking heavily impacts health"
        
    if data.activity_level.lower() == "none" or data.activity_level.lower() == "low":
        score -= 10
        details['activity'] = "Insufficient physical activity"
        
    # Cap score
    score = max(0.0, min(100.0, score))
    
    if score >= 85:
        grade = "A"
        risk = "Low Risk"
    elif score >= 70:
        grade = "B"
        risk = "Moderate Risk"
    elif score >= 50:
        grade = "C"
        risk = "High Risk"
    else:
        grade = "D"
        risk = "Critical Risk"
        
    return HealthScoreResponse(
        overall_score=score,
        health_grade=grade,
        risk_category=risk,
        details=details
    )
