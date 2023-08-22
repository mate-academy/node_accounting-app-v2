'use strict';

const expensesServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (request, response) => {
  const query = request.query;
  const expenses = expensesServices.getExpenses(query);

  response.send(expenses);
};

const getOne = (request, response) => {
  const { expenseId } = request.params;
  const expens = expensesServices.getExpense(expenseId);

  if (!expens) {
    response.statusCode = 404;
    response.send('Not Found');

    return;
  }

  response.send(expens);
};

const create = (request, response) => {
  const { userId, spentAt, title, amount, category, note } = request.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    response.statusCode = 400;
    response.send('Pass all required fields');

    return;
  }

  const user = userServices.getUser(userId);

  if (!user) {
    response.statusCode = 400;
    response.send('User is not Found');

    return;
  }

  const newExpens = expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  response.statusCode = 201;
  response.send(newExpens);
};

const update = (request, response) => {
  const { expenseId } = request.params;
  const expens = expensesServices.getExpense(expenseId);

  if (!expens) {
    response.statusCode = 404;
    response.send('Expense is not found');

    return;
  }

  const { body } = request;

  const updatedExpens = expensesServices.updateExpense(expenseId, body);

  response.statusCode = 200;
  response.send(updatedExpens);
};

const remove = (request, response) => {
  const { expenseId } = request.params;
  const expens = expensesServices.getExpense(expenseId);

  if (!expens) {
    response.statusCode = 404;
    response.send('Not Found');

    return;
  }

  expensesServices.deleteExpense(expenseId);

  response.statusCode = 204;
  response.send();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
