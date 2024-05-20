const ERRORS = {
  INVALID_REQUEST: 'Invalid request',
  NAME_REQUIRED: 'Name is required',
  ID_REQUIRED: 'Id is required',
  USER_NOT_FOUND: 'User not found',
  BODY_REQUIRED: 'Body is required',
  EXPENSES_NOT_FOUND: 'Expenses not found',
};

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

module.exports = {
  ERRORS,
  STATUS_CODES,
};
