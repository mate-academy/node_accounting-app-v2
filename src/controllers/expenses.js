'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

function getAllExpenses(req, res) {
  const { userId, category, from, to } = req.query;

  const searchParams = {
    userId,
    category,
    from,
    to,
  };

  if (!searchParams) {
    res.sendStatus(400);

    return;
  };

  const expenses = expenseService.getAllExpenses(searchParams);

  res.send(expenses);
};

function getExpenseById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.statusCode = 200;
  res.send(foundExpense);
};

function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isAllDataProvided = userId
    && spentAt
    && title
    && amount
    && category
    && note;

  const foundUser = userService.getUserById(userId);

  if (!isAllDataProvided || !foundUser) {
    res.sendStatus(400);

    return;
  };

  const newExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

function removeExpense(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const expenseData = req.body;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expenseService.updateExpense(expenseId, expenseData);

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
