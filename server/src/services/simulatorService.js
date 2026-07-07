const SimulationHistory = require('../models/SimulationHistory');
const ActivityLog = require('../models/ActivityLog');

/**
 * Simulator Service
 * Handles simulation-related business logic
 */
class SimulatorService {
  /**
   * Create a new simulation
   */
  async createSimulation(userId, simulationData) {
    const { scenario, before, after, result, comparison, recommendations } = simulationData;

    const simulation = await SimulationHistory.create({
      user: userId,
      scenario,
      before,
      after,
      result,
      comparison,
      recommendations,
    });

    // Log activity
    await ActivityLog.create({
      user: userId,
      action: 'simulation_created',
      entityType: 'SimulationHistory',
      entityId: simulation._id,
      details: { scenarioName: scenario?.name },
      status: 'success',
    });

    return simulation;
  }

  /**
   * Get simulation history for user
   */
  async getHistory(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [simulations, total] = await Promise.all([
      SimulationHistory.find({ user: userId, isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('scenario result createdAt isSaved'),
      SimulationHistory.countDocuments({ user: userId, isArchived: false }),
    ]);

    return {
      simulations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get saved scenarios
   */
  async getSavedScenarios(userId) {
    const scenarios = await SimulationHistory.find({
      user: userId,
      isSaved: true,
      isArchived: false,
    }).sort({ createdAt: -1 });

    return scenarios;
  }

  /**
   * Get simulation by ID
   */
  async getSimulationById(simulationId, userId) {
    const simulation = await SimulationHistory.findOne({
      _id: simulationId,
      user: userId,
    });

    if (!simulation) {
      throw new Error('Simulation not found');
    }

    return simulation;
  }

  /**
   * Save scenario
   */
  async saveScenario(simulationId, userId) {
    const simulation = await SimulationHistory.findOneAndUpdate(
      { _id: simulationId, user: userId },
      { isSaved: true },
      { new: true }
    );

    if (!simulation) {
      throw new Error('Simulation not found');
    }

    // Log activity
    await ActivityLog.create({
      user: userId,
      action: 'scenario_saved',
      entityType: 'SimulationHistory',
      entityId: simulationId,
      status: 'success',
    });

    return simulation;
  }

  /**
   * Unsave scenario
   */
  async unsaveScenario(simulationId, userId) {
    const simulation = await SimulationHistory.findOneAndUpdate(
      { _id: simulationId, user: userId },
      { isSaved: false },
      { new: true }
    );

    if (!simulation) {
      throw new Error('Simulation not found');
    }

    return simulation;
  }

  /**
   * Archive simulation
   */
  async archiveSimulation(simulationId, userId) {
    const simulation = await SimulationHistory.findOneAndUpdate(
      { _id: simulationId, user: userId },
      { isArchived: true },
      { new: true }
    );

    if (!simulation) {
      throw new Error('Simulation not found');
    }

    // Log activity
    await ActivityLog.create({
      user: userId,
      action: 'simulation_archived',
      entityType: 'SimulationHistory',
      entityId: simulationId,
      status: 'success',
    });

    return simulation;
  }

  /**
   * Delete simulation
   */
  async deleteSimulation(simulationId, userId) {
    const simulation = await SimulationHistory.findOneAndDelete({
      _id: simulationId,
      user: userId,
    });

    if (!simulation) {
      throw new Error('Simulation not found');
    }

    // Log activity
    await ActivityLog.create({
      user: userId,
      action: 'simulation_deleted',
      entityType: 'SimulationHistory',
      entityId: simulationId,
      status: 'success',
    });

    return { success: true };
  }
}

module.exports = new SimulatorService();
