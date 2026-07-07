const simulatorService = require('../services/simulatorService');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * Simulator Controller
 * Handles HTTP requests for simulations
 */
class SimulatorController {
  /**
   * Create new simulation
   * POST /api/simulator
   */
  createSimulation = asyncHandler(async (req, res) => {
    const simulation = await simulatorService.createSimulation(req.user._id, req.body);

    res.status(201).json({
      success: true,
      message: 'Simulation created successfully',
      data: simulation,
    });
  });

  /**
   * Get simulation history
   * GET /api/simulator
   */
  getHistory = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await simulatorService.getHistory(req.user._id, page, limit);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  /**
   * Get saved scenarios
   * GET /api/simulator/saved
   */
  getSavedScenarios = asyncHandler(async (req, res) => {
    const scenarios = await simulatorService.getSavedScenarios(req.user._id);

    res.status(200).json({
      success: true,
      data: scenarios,
    });
  });

  /**
   * Get simulation by ID
   * GET /api/simulator/:id
   */
  getSimulationById = asyncHandler(async (req, res) => {
    const simulation = await simulatorService.getSimulationById(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      data: simulation,
    });
  });

  /**
   * Save scenario
   * PATCH /api/simulator/:id/save
   */
  saveScenario = asyncHandler(async (req, res) => {
    const simulation = await simulatorService.saveScenario(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Scenario saved successfully',
      data: simulation,
    });
  });

  /**
   * Unsave scenario
   * PATCH /api/simulator/:id/unsave
   */
  unsaveScenario = asyncHandler(async (req, res) => {
    const simulation = await simulatorService.unsaveScenario(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Scenario unsaved successfully',
      data: simulation,
    });
  });

  /**
   * Archive simulation
   * PATCH /api/simulator/:id/archive
   */
  archiveSimulation = asyncHandler(async (req, res) => {
    const simulation = await simulatorService.archiveSimulation(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Simulation archived successfully',
      data: simulation,
    });
  });

  /**
   * Delete simulation
   * DELETE /api/simulator/:id
   */
  deleteSimulation = asyncHandler(async (req, res) => {
    await simulatorService.deleteSimulation(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Simulation deleted successfully',
    });
  });
}

module.exports = new SimulatorController();
