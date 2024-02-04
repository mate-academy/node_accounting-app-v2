'use strict';

function sendError(res, code, message) {
  res.status(code).send(message);
}

function generateId(array) {
  return array.length ? Math.max(...array.map((el) => el.id)) + 1 : 1;
}

function findById(array, id) {
  return array.find((item) => item.id === +id);
}

const response = {
  notFound: 404,
  notFoundMessage: 'Expected entity does not exist',
  requiredParameter: 400,
  requiredParamaterMessage: 'Required parameter is not passed',
  created: 201,
  okRequest: 200,
  noContent: 204,
};

module.exports = {
  sendError,
  generateId,
  findById,
  response,
};
