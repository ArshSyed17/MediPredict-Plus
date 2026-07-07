const jwt = require('jsonwebtoken');

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'super-secret-key-for-dev', {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
};

const signRefreshToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET || 'super-refresh-secret-key', {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
};

const verifyToken = (token, isRefresh = false) => {
  const secret = isRefresh 
    ? (process.env.JWT_REFRESH_SECRET || 'super-refresh-secret-key') 
    : (process.env.JWT_SECRET || 'super-secret-key-for-dev');
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  signRefreshToken,
  verifyToken
};
