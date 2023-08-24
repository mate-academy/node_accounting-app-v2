'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;
  const expenses = expenseService
    .getExpensesPrepared(userId, from, to, categories);

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = userService.getUserById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(
    userId, spentAt, title, amount, category, note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(+expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId, spentAt, title, amount, category, note,
  } = req.body;

  if (userId && typeof userId === 'number') {
    foundExpense.userId = userId;
  }

  if (spentAt && typeof spentAt === 'string') {
    foundExpense.spentAt = spentAt;
  }

  if (title && typeof title === 'string') {
    foundExpense.title = title;
  }

  if (amount && typeof amount === 'number') {
    foundExpense.amount = amount;
  }

  if (category && typeof category === 'string') {
    foundExpense.category = category;
  }

  if (note && typeof note === 'string') {
    foundExpense.note = note;
  }

  res.sendStatus = 200;
  res.send(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
