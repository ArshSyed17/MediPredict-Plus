const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const { authenticate } = require('../middlewares/auth');
const { predictionValidation, mongoIdValidation, paginationValidation } = require('../middlewares/validate');
const { predictionLimiter } = require('../middlewares/rateLimiter');

/**
 * Prediction Routes
 * Base path: /api/predictions
 */

// Protected routes
router.post('/', authenticate, predictionLimiter, predictionValidation.create, predictionController.createPrediction);
router.get('/', authenticate, paginationValidation, predictionController.getHistory);
router.get('/statistics', authenticate, predictionController.getStatistics);
router.get('/:id', authenticate, mongoIdValidation.predictionId, predictionController.getPredictionById);
router.patch('/:id/archive', authenticate, mongoIdValidation.predictionId, predictionController.archivePrediction);
router.delete('/:id', authenticate, mongoIdValidation.predictionId, predictionController.deletePrediction);

module.exports = router;
