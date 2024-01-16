'use strict';

const { getUserById } = require('../services/users.service');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
} = require('./../services/expenses.service');

function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;

  const searchedExpenses = getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(searchedExpenses);
}

function getOneExpense(req, res) {
  const { id } = req.params;

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

function createNewExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!getUserById(userId) || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  res.status(201)
    .send(createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }));
}

function updateOneExpense(req, res) {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const normalizedId = +id;

  if (isNaN(normalizedId)) {
    res.sendStatus(400);

    return;
  }

  if ((spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
  ) {
    res.sendStatus(404);

    return;
  }

  if (!getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(updateExpense({
    id: normalizedId,
    spentAt,
    title,
    amount,
    category,
    note,
  }));
}

function deleteExpense(req, res) {
  const { id } = req.params;
  const normalizedId = +id;

  if (isNaN(normalizedId)) {
    res.sendStatus(400);

    return;
  }

  if (!getExpenseById(normalizedId)) {
    res.sendStatus(404);

    return;
  }
  removeExpense(normalizedId);

  res.sendStatus(204);
}

module.exports = {
  getExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteExpense,
};
