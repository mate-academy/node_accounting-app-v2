const { sendErrorResponse } = require('../helpers/sendErrorMessage');
const { STATUS_CODES, ERRORS } = require('../variables/variables');

const validateId = (id, res) => {
  if (!id) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.ID_REQUIRED);

    return false;
  }

  return true;
};

const validateUser = (user, res) => {
  if (!user) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_REQUEST);

    return false;
  }

  if (!user.name) {
    sendErrorResponse(res, STATUS_CODES.BAD_REQUEST, ERRORS.NAME_REQUIRED);

    return false;
  }

  return true;
};

module.exports = {
  validateId,
  validateUser,
};
