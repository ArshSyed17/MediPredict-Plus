const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  const response = {
    success: false,
    message: error.message,
    data: null,
    errors: error.errors
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  logger.error(`${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
