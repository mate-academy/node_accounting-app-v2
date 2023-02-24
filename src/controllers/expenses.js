'use strict';

const expenseService = require('../services/expenses');
const { getUserById } = require('../services/users');

const createExpense = (request, response) => {
  const params = request.body;

  const user = getUserById(params.userId);

  if (!user || !params) {
    response.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(params);

  response.statusCode = 201;
  response.send(newExpense);
};

const getExpenses = (request, response) => {
  const params = request.query;

  const expenses = expenseService
    .getExpenses(params);

  response.send(expenses);
};

const getExpense = (request, response) => {
  const { id } = request.params;
  const expense = expenseService.findExpenseById(id);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  response.send(expense);
};

const removeExpense = (request, response) => {
  const id = Number(request.params.id);
  const expense = expenseService.findExpenseById(id);

  if (isNaN(id)) {
    response.sendStatus(400);

    return;
  }

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(id);

  response.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const params = req.body;

  const expense = expenseService.findExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense(id, params);

  res.send(expense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
