'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

function getFiltered(req, res) {
  const expenses = expenseService.getFiltered(req.query);

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
    title,
  } = req.body;

  const hasUser = userService.getById(userId);

  if (!title || !hasUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
}

function update(req, res) {
  const { expenseId } = req.params;
  const data = req.body;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, data);

  res.statusCode = 200;
  res.send(foundExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.status(204);
  res.send();
}

module.exports = {
  getFiltered,
  getById,
  create,
  update,
  remove,
};
