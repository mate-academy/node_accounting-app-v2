'use strict';

const express = require('express');

const expenseService = require('./expense.service.js');

const expenseRouter = express.Router();

expenseRouter.get('/', (request, response) => {
  if (request.query.userId) {
    request.query.userId = parseInt(request.query.userId);
  }

  const expenses = expenseService.getExpenses(request.query);

  response.send(expenses);
});

expenseRouter.get('/:id', (request, response) => {
  const { id } = request.params;
  const expense = expenseService.getExpenseById(parseInt(id));

  if (!expense) {
    return response.sendStatus(404);
  }

  response.send(expense);
});

expenseRouter.post('/', (request, response) => {
  const { userId, title } = request.body;

  if (!userId || !title) {
    return response.sendStatus(400);
  }

  const expense = expenseService.createExpense(request.body);

  if (!expense) {
    return response.sendStatus(400);
  }

  response.status(201);
  response.send(expense);
});

expenseRouter.patch('/:id', (request, response) => {
  const { id } = request.params;

  if (!request.body) {
    return response.sendStatus(400);
  }

  const expense = expenseService.updateExpenseById(parseInt(id), request.body);

  if (!expense) {
    return response.sendStatus(404);
  }

  response.send(expense);
});

expenseRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  const deletedExpense = expenseService.deleteExpenseById(parseInt(id));

  if (!deletedExpense) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
});

module.exports = expenseRouter;
