'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

function getAll(req, res) {
  const queryParams = req.query;

  const expenses = expenseService.getAll(queryParams);

  res.send(expenses);
}

function getById(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;
  const foundUser = userService.getById(userId);

  const isDataValid = !foundUser
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string';

  if (isDataValid) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;
  const newExpense = expenseService.create(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string' || !title) {
    res.sendStatus(404);

    return;
  }

  expenseService.update({
    id: expenseId,
    title,
  });
  res.send(foundExpense);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
