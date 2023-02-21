'use strict';

const expenseService = require('../services/expencesServices');
const userService = require('../services/usersServices');

function getAll(req, res) {
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
  }

  const expenses = expenseService.getAll(searchParams);

  res.statusCode = 200;
  res.send(expenses);
}

function getExpenseId(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser || !title || !amount || !category || !userId) {
    res.sendStatus(400);

    return;
  }

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
}

function deleteExpense(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense({
    expenseId, title,
  });

  res.send(foundExpense);
}

module.exports = {
  getAll,
  getExpenseId,
  addExpense,
  deleteExpense,
  updateExpense,
};
