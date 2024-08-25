const formatResponse = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(formatResponse(1, 'error', 'Internal server error'));
};

module.exports = errorHandler;