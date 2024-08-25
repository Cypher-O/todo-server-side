const formatResponse = (code, status, message, data = null) => {
    return {
      code,
      status,
      message,
      data
    };
  };
  
  module.exports = formatResponse;