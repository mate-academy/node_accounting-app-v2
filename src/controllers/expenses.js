'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const createExpense = (req, res) => {
  const { spentAt, userId, title, amount, category, note } = req.body;
  const findUser = userService.someUser(userId);

  if (!findUser) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(expenseService.createExpense(
    spentAt, userId, title, amount, category, note,
  ));
};

const getExpenses = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const newExpenses = expenseService.getExpenses(
    userId,
    category,
    from,
    to,
  );

  res.statusCode = 200;
  res.send(newExpenses);
};

const getExpensesId = (req, res) => {
  const { expensId } = req.params;
  const foundUser = expenseService.getExpensesId(expensId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(foundUser);
};

const deleteExpense = (req, res) => {
  const { expensId } = req.params;
  const foundExpens = expenseService.getExpensesId(expensId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expensId);
  res.sendStatus(204);
};

const updateExpendse = (req, res) => {
  const { expensId } = req.params;
  const { title } = req.body;
  const foundExpens = expenseService.getExpensesId(expensId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expenseService.updateExpendse(expensId, title));
};

module.exports = {
  createExpense,
  getExpenses,
  getExpensesId,
  deleteExpense,
  updateExpendse,
};
