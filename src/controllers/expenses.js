'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/user');

const getExpenses = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.json(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.json(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExists = userId !== undefined
    && userService.getUserById(userId.toString());

  if (!(
    isUserExists
    && userService.getUserById(userId.toString())
    && spentAt !== undefined
    && title !== undefined
    && amount !== undefined
    && category !== undefined
  )) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = expensesService.addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.json(createdExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenseById(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const allowedKeys = [
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const changes = {};

  for (const key of allowedKeys) {
    if (req.body[key] !== undefined) {
      changes[key] = req.body[key];
    }
  }

  if (Object.keys(changes).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updated = expensesService.patchExpense(foundExpense, changes);

  res.json(updated);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
