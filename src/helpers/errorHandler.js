const { ERRORS, STATUS_CODES } = require('../variables/variables');
const { sendErrorResponse } = require('./sendErrorMessage');

const errorHandler = (e, res) => {
  if (e.message === ERRORS.userNotFound) {
    sendErrorResponse(res, STATUS_CODES.notFound, ERRORS.userNotFound);
  }

  if (e.message === ERRORS.badUserRequest) {
    sendErrorResponse(res, STATUS_CODES.badRequest, ERRORS.badUserRequest);
  }

  if (e.message === ERRORS.expensesNotFound) {
    sendErrorResponse(res, STATUS_CODES.notFound, ERRORS.expensesNotFound);
  }

  if (e.message === ERRORS.bodyRequired) {
    sendErrorResponse(res, STATUS_CODES.badRequest, ERRORS.bodyRequired);
  }

  if (e.message === ERRORS.idRequired) {
    sendErrorResponse(res, STATUS_CODES.badRequest, ERRORS.idRequired);
  }

  if (e.message === ERRORS.invalidRequest) {
    sendErrorResponse(res, STATUS_CODES.badRequest, ERRORS.invalidRequest);
  }

  if (e.message === ERRORS.nameRequired) {
    sendErrorResponse(res, STATUS_CODES.badRequest, ERRORS.nameRequired);
  }
};

module.exports = {
  errorHandler,
};
