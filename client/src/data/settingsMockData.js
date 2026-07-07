export const defaultSettings = {
  account: {
    email: "john.doe@email.com",
    language: "en",
    timezone: "America/Los_Angeles",
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: "2026-03-01T10:00:00.000Z",
  },
  notifications: {
    email: {
      predictions: true,
      reports: true,
      reminders: true,
      marketing: false,
    },
    sms: {
      predictions: false,
      reports: true,
      reminders: true,
      marketing: false,
    },
  },
  theme: "dark",
  privacy: {
    shareAnalytics: true,
    profileVisibility: "private",
    dataRetention: "12months",
  },
  connectedDevices: [
    { id: "d1", name: "Apple Watch Series 9", type: "Wearable", lastSync: "2026-07-03T08:30:00.000Z", connected: true },
    { id: "d2", name: "Fitbit Charge 6", type: "Fitness Tracker", lastSync: "2026-06-28T14:00:00.000Z", connected: false },
    { id: "d3", name: "Omron BP Monitor", type: "Medical Device", lastSync: "2026-07-02T07:15:00.000Z", connected: true },
  ],
};
