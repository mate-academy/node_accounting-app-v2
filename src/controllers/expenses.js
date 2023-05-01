'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const expenses = expenseService.getExpenses(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const expenseId = +req.params.expenseId;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    category,
  } = req.body;

  const findUser = userService.getUserById(+userId);

  if (!findUser || !spentAt || !title || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(req.body);

  res.status(201);
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  if (expenseId < 0) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expenseService.updateExpense(expenseId, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  addExpense,
  removeExpense,
  updateExpense,
};
