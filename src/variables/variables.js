const ERRORS = {
  invalidRequest: 'Invalid request',
  nameRequired: 'Name is required',
  idRequired: 'Id is required',
  userNotFound: 'User not found',
  bodyRequired: 'Body is required',
  expensesNotFound: 'Expenses not found',
  badUserRequest: 'Expenses for user not found',
};

const STATUS_CODES = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

module.exports = {
  ERRORS,
  STATUS_CODES,
};
