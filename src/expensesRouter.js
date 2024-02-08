'use strict';

const express = require('express');
const expensesRouter = express.Router();
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('./expensesServices');

// EXPENSES ROUTES
expensesRouter.get('/', (request, response) => {
  const { userId, categories, from, to } = request.query;
  const expenses = getExpenses(userId, categories, from, to);

  response.json(expenses);
});

expensesRouter.post('/', (request, response) => {
  try {
    const { userId, spentAt, title, amount, category, note } = request.body;

    const newExpense = createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note
    );

    response.statusCode = 201;
    response.send(newExpense);
  } catch (err) {
    response.sendStatus(400);
  }
});

expensesRouter.get('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const expense = getExpense(id);

    response.send(expense);
  } catch (err) {
    response.sendStatus(404);
  }
});

expensesRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    deleteExpense(id);

    response.sendStatus(204);
  } catch (err) {
    response.sendStatus(404);
  }
});

expensesRouter.patch('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { spentAt, title, amount, category, note } = request.body;

    const updatedExpense = updateExpense(
      id,
      spentAt,
      title,
      amount,
      category,
      note
    );

    response.send(updatedExpense);
  } catch (err) {
    if (err.message === 'Expense not found.') {
      response.sendStatus(404);
    }

    if (err.message === 'Incomplete data provided.') {
      response.sendStatus(404);
    }
  }
});

module.exports = expensesRouter;
