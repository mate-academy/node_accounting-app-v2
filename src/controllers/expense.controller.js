'use strict';

const expenseService = require('../services/expense.service');

const getAll = (req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(expenseService.getAllExpenses(userId, from, to, categories));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = expenseService
    .addExpense(userId, spentAt, title, amount, category, note);

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expenses = expenseService.removeExpense(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.status(204);
  res.send(expenses);
};

const update = (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = expenseService
    .updateExpense(id, spentAt, title, amount, category, note);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
