const express = require('express');
const { protect } = require('../middlewares/auth');
const Settings = require('../models/Settings');
const ApiResponse = require('../utils/apiResponse');

const router = express.Router();

router.use(protect);

// GET /api/v1/settings
router.get('/', async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      // Create default settings if not exists
      settings = await Settings.create({
        user: req.user._id,
        notifications: { 
          email: true, 
          push: true, 
          sms: false, 
          predictionAlerts: true, 
          reportUpdates: true, 
          appointmentReminders: true, 
          marketing: false 
        },
        privacy: { 
          shareDataWithDoctors: true, 
          allowAnalytics: true, 
          publicProfile: false 
        },
        preferences: { 
          language: 'en', 
          timezone: 'UTC', 
          dateFormat: 'MM/DD/YYYY', 
          theme: 'dark' 
        },
        security: { 
          twoFactorEnabled: false, 
          loginAlerts: true 
        },
        connectedDevices: [
          { deviceId: 'fitbit', deviceName: 'Fitbit Sense', deviceType: 'Smartwatch', lastConnected: new Date(), connected: true },
          { deviceId: 'apple_watch', deviceName: 'Apple Watch Series 8', deviceType: 'Smartwatch', lastConnected: new Date(), connected: false },
        ]
      });
    }

    // Merge in account details from req.user
    const settingsObject = settings.toObject();
    settingsObject.account = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      avatar: req.user.avatar,
    };

    res.status(200).json(new ApiResponse(200, 'Settings retrieved successfully', settingsObject));
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/settings
router.put('/', async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      settings = new Settings({ user: req.user._id });
    }

    const updateData = req.body;
    for (const key of Object.keys(updateData)) {
      if (typeof updateData[key] === 'object' && updateData[key] !== null) {
        settings[key] = { ...settings[key], ...updateData[key] };
      } else {
        settings[key] = updateData[key];
      }
    }

    await settings.save();

    // Merge in account details
    const settingsObject = settings.toObject();
    settingsObject.account = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      avatar: req.user.avatar,
    };

    res.status(200).json(new ApiResponse(200, 'Settings updated successfully', settingsObject));
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/settings/device/:deviceId
router.patch('/device/:deviceId', async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    let settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      return res.status(404).json(new ApiResponse(404, 'Settings not found'));
    }

    const device = settings.connectedDevices.find(d => d.deviceId === deviceId);
    if (device) {
      device.connected = !device.connected;
      device.lastConnected = new Date();
      await settings.save();
    }

    // Merge in account details
    const settingsObject = settings.toObject();
    settingsObject.account = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      avatar: req.user.avatar,
    };

    res.status(200).json(new ApiResponse(200, 'Device status updated', settingsObject));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
