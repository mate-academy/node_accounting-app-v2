'use strict';

const expenseService = require('../services/expense');
const userService = require('../services/user');

const getFiltered = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expenseService.getFiltered(+userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const expense = req.body;
  const { userId } = expense;

  const foundUser = userService.getById(userId);

  if (Object.keys(expense).length < 6 || !foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.addExpense(expense);

  res.status(201).send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.removeExpense(+expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = req.body;

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  if (!Object.keys(expense).length) {
    return res.sendStatus(400);
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
