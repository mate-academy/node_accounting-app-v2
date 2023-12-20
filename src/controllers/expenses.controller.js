'use strict';

const expenseService = require('../services/expenses.service');

const get = (req, res) => {
  res.send(expenseService.getExpenses());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const normalizedId = parseInt(id);

  const expense = expenseService.getExpenseById(normalizedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const expense = req.body;

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(expense);

  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const normalizedId = parseInt(id);

  const expense = expenseService.getExpenseById(normalizedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(normalizedId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const newProperties = req.body;

  const normalizedId = parseInt(id);

  if (!expenseService.getExpenseById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService
    .updateExpense(normalizedId, newProperties);

  res.send(updatedExpense);
};

module.exports = {
  get, getOne, add, remove, update,
};
