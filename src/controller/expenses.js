'use strict';

const expenseService = require('../services/expenses');
const userServise = require('../services/users');

const getFiltered = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const expenses = expenseService.getFiltered(+userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const expense = req.body;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = expense;

  const foundUser = userServise.getById(userId);

  if (!foundUser
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(expense);

  res.status(201);
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(+expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = req.body;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = expense;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (
    !spentAt
    && !title
    && !amount
    && !category
    && !note
  ) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.updateExpense(+expenseId, expense);

  res.send(updatedExpense);
};

module.exports = {
  getFiltered,
  addExpense,
  getOne,
  removeExpense,
  updateExpense,
};
