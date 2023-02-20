'use strict';

const expenseService = require('../services/expences');
// const userService = require('../services/users');

function getAll(req, res) {
  const { userId, category, from, to } = req.query;

  const searchParams = {
    userId,
    category,
    from,
    to,
  };

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

  if (!userId || !title || !amount || !category) {
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
  const { title, amount, category, note } = req.body;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateExpense({
    id: expenseId,
    title: title || foundExpense.title,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  });

  res.send(updatedExpense);
}

module.exports = {
  getAll,
  getExpenseId,
  addExpense,
  deleteExpense,
  updateExpense,
};
