import os
import joblib
import logging

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self, models_dir: str):
        self.models_dir = models_dir
        self.models = {}
        
    def load_model(self, disease: str):
        if disease in self.models:
            return self.models[disease]
            
        model_path = os.path.join(self.models_dir, f"{disease}_model.pkl")
        if not os.path.exists(model_path):
            logger.error(f"Model not found: {model_path}")
            return None
            
        try:
            data = joblib.load(model_path)
            self.models[disease] = data
            logger.info(f"Successfully loaded {disease} model version {data['metadata']['version']}")
            return data
        except Exception as e:
            logger.error(f"Failed to load {disease} model: {str(e)}")
            return None

    def get_all_models_status(self):
        status = {}
        expected_models = ['diabetes', 'heart', 'ckd', 'stroke', 'liver', 'hypertension']
        for disease in expected_models:
            model_path = os.path.join(self.models_dir, f"{disease}_model.pkl")
            if os.path.exists(model_path):
                data = self.load_model(disease)
                if data:
                    status[disease] = {
                        "loaded": True,
                        "version": data["metadata"]["version"],
                        "training_date": data["metadata"]["training_date"],
                        "metrics": data["metadata"]["metrics"]
                    }
                else:
                    status[disease] = {"loaded": False, "error": "Load failed"}
            else:
                status[disease] = {"loaded": False, "error": "File not found"}
        return status
