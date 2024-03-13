'use strict';

const SUCCESS_CODE = 200;
const SUCCESSFULLY_CREATED_CODE = 201;
const COMPLETED_NO_CONTENT_CODE = 204;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const UNPROCESSABLE_ENTITY_CODE = 422;

const NOT_FOUND_USER_MESSAGE = 'Can\'t find such user. Check search params!';
const NOT_FOUND_USERS_MESSAGE = 'Can\'t find users. Create at least one user!';
const UNPROCESSABLE_ENTITY_MESSAGE = 'The server can\'t process your request';

const NOT_FOUND_EXPENSE_MESSAGE
  = 'Can\'t find such expense. Check search params!';

module.exports = {
  SUCCESS_CODE,
  SUCCESSFULLY_CREATED_CODE,
  COMPLETED_NO_CONTENT_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  UNPROCESSABLE_ENTITY_CODE,

  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_USERS_MESSAGE,
  UNPROCESSABLE_ENTITY_MESSAGE,

  NOT_FOUND_EXPENSE_MESSAGE,
};
