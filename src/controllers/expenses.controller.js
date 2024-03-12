'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expensesService.getExpenses(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const newExpenses = req.body;

  if (!userService.getUserById(newExpenses.userId)) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(expensesService.createExpenses(newExpenses));
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, newExpense);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
