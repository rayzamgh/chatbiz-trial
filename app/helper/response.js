exports.errorResponse = function (errorMessage, statusCode = 400) {
  return {
    meta: {
      message: errorMessage,
      status: statusCode,
    },
  };
};

exports.response = function (data, message, statusCode = 200) {
  if (data != null) {
    return {
      data,
      meta: {
        message,
        status: statusCode,
      },
    };
  }
  return {
    meta: {
      message,
      status: statusCode,
    },
  };
};
