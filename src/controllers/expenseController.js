'use strict';

const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

function getAllExpenses(req, res) {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const filteredExpenses = expenseService
    .getExpenses(userId, categories, from, to);

  res.send(filteredExpenses);
}

function getExpenseByUserId(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return req.sendStatus(400);
  }

  const foundExpense = expenseService.getUserById(userId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(200);
  res.send(foundExpense);
}

function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getByUserId(userId);

  if (!foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.createExpense({
    userId,
    category,
    title,
    amount,
    spentAt,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
}

function removeExpense(req, res) {
  const { id } = req.params;

  const isExpenseExist = expenseService.getExpenseById(id);

  if (!isExpenseExist) {
    return res.sendStatus(404);
  }

  expenseService.deleteExpense(id);
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { id } = req.params;

  const foundExpense = expenseService.getExpenseById(id);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.updateExpense(foundExpense, req);

  res.statusCode = 200;
  res.send(foundExpense);
}

module.exports = {
  getAllExpenses,
  getExpenseByUserId,
  createExpense,
  removeExpense,
  updateExpense,
};
