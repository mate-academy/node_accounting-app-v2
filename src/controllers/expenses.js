'use strict';

const expenseService = require('../services/expenses');
const { getUserById } = require('../services/users');

const getAll = (req, res) => {
  const params = req.query;
  const expenses = expenseService.getFilteredExpenses(params);

  res.send(expenses);
};

const getOne = (req, res) => {
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
};

const addNewExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = getUserById(userId);

  const isAllDataProvided = (
    foundUser
    && userId
    && spentAt
    && title
    && amount
    && category
  );

  if (!isAllDataProvided) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createNewExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpence = expenseService.getExpenseById(expenseId);

  if (!foundExpence) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  if (!newData) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = expenseService.getExpenseById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.updateExpense({
    id: expenseId,
    newData,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  addNewExpense,
  deleteExpense,
  updateExpense,
};
