const response = () => {
  const jsonSuccess = (res, data, message, statusCode) => {
    return res.status(statusCode).json({
      data: data,
      message: message,
      statusCode: statusCode,
    });
  };
  const jsonError = (res, error, message, errorCode) => {
    return res.status(errorCode).json({
      error: error,
      message: message,
      errorCode: errorCode,
    });
  };

  return {
    jsonSuccess,
    jsonError,
  };
};

module.exports = response();
