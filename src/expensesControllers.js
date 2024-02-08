'use strict';

const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('./expensesServices');

const getExpensesByQuery = (request, response) => {
  const { userId, categories, from, to } = request.query;
  const expenses = getExpenses(userId, categories, from, to);

  response.json(expenses);
};

const createNewExpense = (request, response) => {
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
};

const getExpenseById = (request, response) => {
  try {
    const { id } = request.params;
    const expense = getExpense(id);

    response.send(expense);
  } catch (err) {
    response.sendStatus(404);
  }
};

const removeExpense = (request, response) => {
  try {
    const { id } = request.params;

    deleteExpense(id);

    response.sendStatus(204);
  } catch (err) {
    response.sendStatus(404);
  }
};

const updateExpenseInfo = (request, response) => {
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
};

module.exports = {
  getExpensesByQuery,
  createNewExpense,
  getExpenseById,
  removeExpense,
  updateExpenseInfo,
};
