'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expenseService.getAll(userId, categories, from, to);

  if (userId || categories || from || to) {
    if (!expenses.length) {
      res.sendStatus(404);

      return;
    }
  }
  res.send(expenses);
};

const getExpense = (req, res) => {
  const id = +req.params.id;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  const expense = req.body;

  const user = userService.getById(expense.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(expense);

  res.status(201).send(newExpense);
};

const removeExpense = (req, res) => {
  const id = +req.params.id;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = +req.params.id;
  const updatedExpense = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(id, updatedExpense);

  res.send(expense);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
