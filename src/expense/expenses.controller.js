'use strict';

const HttpStatus = require('http-status-codes');

const {
  getAllExpenses,
  getOneExpense,
  checkAtleastOneUser,
  createExpense,
  findIndexOneExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.service');

const {
  INVALID_REQUEST_BODY,
  USER_NOT_FOUND,
  EXPENSE_NOT_FOUND,
} = require('../constants/errorMessages');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expensesQuery = getAllExpenses(userId, categories, from, to);

  res.send(expensesQuery);
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const expenseIdFound = getOneExpense(id);

  if (!expenseIdFound) {
    res.status(HttpStatus.NOT_FOUND).send(EXPENSE_NOT_FOUND);

    return;
  }

  res.send(expenseIdFound);
};

const createExpenseController = (req, res) => {
  const { title, category, note, amount, userId, spentAt } = req.body;

  if (!title || !category || !note || !amount || !userId || !spentAt) {
    res.status(HttpStatus.BAD_REQUEST).send(INVALID_REQUEST_BODY);

    return;
  }

  const userExists = checkAtleastOneUser(userId);

  if (!userExists) {
    res.status(HttpStatus.BAD_REQUEST).send(USER_NOT_FOUND);

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

  res.status(HttpStatus.CREATED).send(newExpense);
};

const updateExpenseController = (req, res) => {
  const { id } = req.params;
  const { ...paramsToUpdate } = req.body;

  const checkedExpense = getOneExpense(id);

  if (!checkedExpense) {
    res.sendStatus(HttpStatus.NOT_FOUND);

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
    res.sendStatus(HttpStatus.NOT_FOUND);

    return;
  }

  deleteExpense(expenseUpdateIndex);

  res.sendStatus(HttpStatus.NO_CONTENT);
};

module.exports = {
  getAll,
  getOneById,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
};
