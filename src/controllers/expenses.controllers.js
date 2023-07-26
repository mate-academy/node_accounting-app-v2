'use strict';

const expensesServices = require('../services/expenses.services');
const usersServices = require('../services/users.services');

const getFilteredExpenses = (request, response) => {
  const expenses = expensesServices.getFiltered(request.query);

  response.send(expenses);
};

const getOneExpense = (request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  response.send(foundExpense);
};

const createExpense = (request, response) => {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
  } = request.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    response.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExpense(request.body);

  response.statusCode = 201;
  response.send(newExpense);
};

const removeExpense = (request, response) => {
  const { expenseId } = request.params;
  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(expenseId);
  response.sendStatus(204);
};

const updateExpense = (request, response) => {
  const { expenseId } = request.params;
  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  const updateData = { ...request.body };

  if ('id' in updateData) {
    delete updateData['id'];
  };

  if ('userId' in updateData) {
    delete updateData['userId'];
  }

  if ('spentAt' in updateData) {
    updateData['spentAt'] = new Date(updateData['spentAt']);
  }

  if (Object.keys(updateData).length === 0) {
    response.sendStatus(400);

    return;
  }

  expensesServices.updateExpense(expenseId, updateData);
  response.send(foundExpense);
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
