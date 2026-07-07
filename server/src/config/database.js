const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (retries = 5, delay = 5000) => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    logger.error('❌ MONGODB_URI is missing in .env file');
    process.exit(1);
  }

  while (retries > 0) {
    try {
      logger.info('Attempting to connect to MongoDB...');
      const conn = await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB Connection Error: ${err.message}`);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB Disconnected! Attempting to reconnect...');
      });

      // Graceful shutdown handling for MongoDB
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to app termination');
        process.exit(0);
      });

      return; // Exit the function once successfully connected
    } catch (error) {
      retries -= 1;
      logger.error(`❌ MongoDB Connection Failed! Retries left: ${retries}`);
      logger.error(error.message);
      
      if (retries === 0) {
        logger.error('❌ Could not connect to MongoDB after multiple attempts. Exiting...');
        process.exit(1);
      }
      
      logger.info(`Waiting ${delay / 1000} seconds before retrying...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;