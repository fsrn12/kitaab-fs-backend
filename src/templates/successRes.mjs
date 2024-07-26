const response = function (res, statusCode, msg, result, token, bool) {
  return res.status(statusCode).json({
    message: msg,
    result,
    token,
    logged: bool,
  });
};

export default response;
