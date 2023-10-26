'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = (request, response) => {
  response.send(expensesService.getAllExpenses(request.query));
};

const addExpense = (request, response) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = request.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !usersService.getUserById(userId)) {
    response.sendStatus(400);

    return;
  }

  response.status(201).send(expensesService.createExpense(request.body));
};

const getCurrentExpense = (request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response.sendStatus(400);

    return;
  }

  const currentExpense = expensesService.getExpenseById(expenseId);

  if (!currentExpense) {
    response.sendStatus(404);

    return;
  }

  response.status(200).send(currentExpense);
};

const removeExpense = (request, response) => {
  const { expenseId } = request.params;
  const currentExpense = expensesService.getExpenseById(expenseId);

  if (!currentExpense) {
    response.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);

  response.sendStatus(204);
};

const updateExpense = (request, response) => {
  const { expenseId } = request.params;
  const currentExpense = expensesService.getExpenseById(expenseId);

  if (!currentExpense) {
    response.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(
    expenseId,
    request.body
  );

  response.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  addExpense,
  getCurrentExpense,
  removeExpense,
  updateExpense,
};
