const ApiResponse = (res, statusCode, data, message) => {
  res
    .status(statusCode)
    .json({
      statusCode,
      data,
      message,
      success: statusCode >= 200 && statusCode < 300,
    });
};

export default ApiResponse;