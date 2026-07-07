const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const NotificationService = require('../services/notificationService');

const initCronJobs = (io) => {
  // Run every hour to check for upcoming appointments (e.g. within the next 24 hours)
  cron.schedule('0 * * * *', async () => {
    console.log('[CRON]: Running appointment reminder check');
    try {
      const now = new Date();
      const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      // Find scheduled appointments happening within the next 24 hours
      const upcomingAppointments = await Appointment.find({
        status: 'Scheduled',
        date: { $gte: now, $lte: next24Hours }
      }).populate('patient doctor');

      for (const appt of upcomingAppointments) {
        // Here we could check if we already reminded them (could add a 'remindedAt' field in the future)
        // For now, this is a mock implementation
        await NotificationService.createNotification({
          user: appt.patient.user,
          title: 'Upcoming Appointment Reminder',
          message: `You have an appointment scheduled with Dr. ${appt.doctor.specialization} on ${appt.date.toISOString().split('T')[0]} at ${appt.timeSlot}.`,
          type: 'Info'
        }, io);
      }
    } catch (error) {
      console.error('[CRON Error]:', error);
    }
  });

  // Daily cleanup of old notifications (older than 30 days)
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON]: Running daily cleanup of old notifications');
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const Notification = require('../models/Notification');
      await Notification.deleteMany({ createdAt: { $lt: thirtyDaysAgo }, isRead: true });
    } catch (error) {
      console.error('[CRON Error]:', error);
    }
  });
};

module.exports = initCronJobs;
