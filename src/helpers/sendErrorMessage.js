const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).send(message);
};

module.exports = {
  sendErrorResponse,
};
