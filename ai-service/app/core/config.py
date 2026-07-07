import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MediPredict+ AI Engine"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Path to saved models
    MODELS_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../training/saved_models'))
    KNOWLEDGE_BASE_PATH: str = os.path.abspath(os.path.join(os.path.dirname(__file__), '../recommendations.json'))
    
    class Config:
        env_file = ".env"

settings = Settings()
