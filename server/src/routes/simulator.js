const express = require('express');
const router = express.Router();
const simulatorController = require('../controllers/simulatorController');
const { authenticate } = require('../middlewares/auth');
const { simulationValidation, mongoIdValidation, paginationValidation } = require('../middlewares/validate');
const { predictionLimiter } = require('../middlewares/rateLimiter');

/**
 * Simulator Routes
 * Base path: /api/simulator
 */

// Protected routes
router.post('/', authenticate, predictionLimiter, simulationValidation.create, simulatorController.createSimulation);
router.get('/', authenticate, paginationValidation, simulatorController.getHistory);
router.get('/saved', authenticate, simulatorController.getSavedScenarios);
router.get('/:id', authenticate, mongoIdValidation.predictionId, simulatorController.getSimulationById);
router.patch('/:id/save', authenticate, mongoIdValidation.predictionId, simulatorController.saveScenario);
router.patch('/:id/unsave', authenticate, mongoIdValidation.predictionId, simulatorController.unsaveScenario);
router.patch('/:id/archive', authenticate, mongoIdValidation.predictionId, simulatorController.archiveSimulation);
router.delete('/:id', authenticate, mongoIdValidation.predictionId, simulatorController.deleteSimulation);

module.exports = router;
