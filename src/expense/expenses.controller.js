'use strict';

const {
  getAllExpenses,
  getOneExpense,
  checkAtleastOneUser,
  createExpense,
  findIndexOneExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expensesQuery = getAllExpenses(userId, categories, from, to);

  res.send(expensesQuery);
};

const getOneById = (req, res) => {
  const { id } = req.params;

  const expenseIdFound = getOneExpense(id);

  if (!expenseIdFound) {
    res.status(404).send('Expense not found');
  }

  res.send(expenseIdFound);
};

const createExpenseController = (req, res) => {
  const { title, category, note, amount, userId, spentAt } = req.body;

  if (!title || !category || !note || !amount || !userId || !spentAt) {
    res.status(400).send('Invalid request body');

    return;
  }

  const userExists = checkAtleastOneUser(userId);

  if (!userExists) {
    res.status(400).send('User not found');

    return;
  }

  const newExpense = {
    id: Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  createExpense(newExpense);

  res.status(201).send(newExpense);
};

const updateExpenseController = (req, res) => {
  const { id } = req.params;

  const {
    ...paramsToUpdate
  } = req.body;

  const checkedExpense = getOneExpense(id);

  if (!checkedExpense) {
    res.sendStatus(404);

    return;
  }

  updateExpense(checkedExpense, paramsToUpdate);

  res.send(checkedExpense);
};

const deleteExpenseController = (req, res) => {
  const { id } = req.params;

  const checkedExpense = getOneExpense(id);
  const expenseUpdateIndex = findIndexOneExpense(checkedExpense);

  if (expenseUpdateIndex < 0) {
    res.sendStatus(404);
  }

  deleteExpense(expenseUpdateIndex);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOneById,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
};
