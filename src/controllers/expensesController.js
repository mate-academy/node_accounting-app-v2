'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
} = require('../services/expensesService');

const { getUserById } = require('../services/usersService');

function getExpenses(req, res) {
  const searchedExpenses = getAllExpenses(req.query);

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

  if (isNaN(+id)) {
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
    id: +id,
    spentAt,
    title,
    amount,
    category,
    note,
  }));
}

function deleteExpense(req, res) {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  if (!getExpenseById(+id)) {
    res.sendStatus(404);

    return;
  }
  removeExpense(+id);

  res.sendStatus(204);
}

module.exports = {
  getExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteExpense,
};
