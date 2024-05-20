const { sendErrorResponse } = require('../helpers/sendErrorMessage');
const { STATUS_CODES, ERRORS } = require('../variables/variables');

const validateId = (id, res) => {
  if (!id) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.ID_REQUIRED);

    return false;
  }

  return true;
};

const validateExpenses = (expenses, res) => {
  if (!expenses) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_REQUEST);

    return false;
  }

  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  if (requiredFields.some((field) => !expenses[field])) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.BODY_REQUIRED);

    return false;
  }

  return true;
};

module.exports = {
  validateId,
  validateExpenses,
};
