const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/responseFormatter');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json(formatResponse(1, 'error', 'Authentication token is required'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(formatResponse(1, 'error', 'Invalid or expired token'));
    }
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    next();
  });
};

module.exports = authenticateToken;