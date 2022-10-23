'use strict';

const expenseServise = require('../servises/expenses.js');
const userServise = require('../servises/users.js');

function getAll(req, res) {
  const expenses = expenseServise.getExpenses(req.query);

  res.send(expenses);
}

function getOne(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseServise.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function properDate(
  spentAt,
  title,
  amount,
  category,
  note,
) {
  return new Date(spentAt).toString() !== 'Wrong Date'
  || typeof title === 'string'
  || typeof amount === 'number'
  || typeof category === 'string'
  || typeof note === 'string';
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

  if (!userServise.getById(userId) || !properDate(
    spentAt,
    title,
    amount,
    category,
    note,
  )
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServise
    .createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

  res.statusCode = 201;
  res.send(newExpense);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseServise.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!properDate(
    spentAt,
    title,
    amount,
    category,
    note,
  )) {
    res.sendStatus(400);

    return;
  }

  const updated = expenseServise.updateExpense(
    +expenseId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.send(updated);
}

function deleteExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseServise.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.removeExpense(+expenseId);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  createExpense,
  deleteExpense,
  updateExpense,
};
