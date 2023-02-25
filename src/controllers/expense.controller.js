'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

function getAll(req, res) {
  const searchParams = req.query;
  const expenses = expenseService.getAll(searchParams);

  res.send(expenses);
}

function findById(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
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

  const foundUser = userService.findById(userId);

  const isRequiredDataProvided = userId
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string';

  if (!isRequiredDataProvided || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

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

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(expenseId, { title });

  res.statusCode = 200;
  res.send(updatedExpense);
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
};
