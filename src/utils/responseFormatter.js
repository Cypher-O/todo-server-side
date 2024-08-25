const formatResponse = (code, status, message, data = {}) => {
    return {
      code,
      status,
      message,
      data
    };
  };
  
  module.exports = formatResponse;