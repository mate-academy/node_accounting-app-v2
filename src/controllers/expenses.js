'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

function getExpenses(req, res) {
  const expenses = expenseService.getExpenses(req.query);

  res.send(expenses);
};

function getExpense(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(404);

    return;
  };

  const foundExpense = expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

function createExpense(req, res) {
  const { body } = req;
  const newExpense = expenseService.createExpense(body);

  if (!body.userId || !userService.getUser(body.userId)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

function updateExpense(req, res) {
  const { body } = req;
  const { expenseId } = req.params;

  if (!expenseService.getExpense(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateExpense(expenseId, body);

  res.send(updatedExpense);
};

function deleteExpense(req, res) {
  const { expenseId } = req.params;

  if (!expenseService.getExpense(expenseId)) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
