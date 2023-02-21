'use strict';

const expenseService = require('../services/expenses');
const { getUserById } = require('../services/users');

const createExpense = (request, response) => {
  const params = request.body;

  const foundUser = getUserById(params.userId);

  if (!foundUser || !params) {
    response.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(params);

  response.statusCode = 201;
  response.send(newExpense);
};

const getExpenses = (request, response) => {
  const params = request.query;

  const foundExpenses = expenseService
    .getExpenses(params);

  response.send(foundExpenses);
};

const getExpense = (request, response) => {
  const { id } = request.params;
  const expense = expenseService.getExpensesById(id);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  response.send(expense);
};

const removeExpense = (request, response) => {
  const { id } = request.params;
  const foundExpense = expenseService.getExpensesById(id);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(id);

  response.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const params = req.body;

  const foundExpense = expenseService.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense(id, params);

  res.send(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
