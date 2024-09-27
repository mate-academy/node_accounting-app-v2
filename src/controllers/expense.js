'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (request, response) => {
  const searchParams = request.query;

  const result = expenseService.getAll(searchParams);

  response.send(result);
};

const getById = (request, response) => {
  const { expenseId } = request.params;
  const expense = expenseService.findById(expenseId);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  response.send(expense);
};

const create = (request, response) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = request.body;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    response.sendStatus(400);

    return;
  }

  const isDataValid
    = typeof spentAt === 'string'
    || typeof title === 'string'
    || typeof amount === 'number'
    || typeof category === 'string';

  if (!isDataValid) {
    response.sendStatus(400);

    return;
  }

  const expenseData = request.body;

  response.statusCode = 201;
  response.send(expenseService.create(expenseData));
};

const update = (request, response) => {
  const { expenseId } = request.params;
  const expense = expenseService.findById(expenseId);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  const expenseData = request.body;

  expenseService.update(expenseId, expenseData);

  response.send(expense);
};

const remove = (request, response) => {
  const { expenseId } = request.params;
  const expense = expenseService.findById(expenseId);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  response.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
