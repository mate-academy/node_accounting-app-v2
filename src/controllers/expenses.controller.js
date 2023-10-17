'use strict';

const usersServise = require('../servises/users.service');
const expenseService = require('../servises/expenses.service');

const getAllExpenses = (req, res) => {
  const { query } = req;
  const expenses = expenseService.getAll({ query });

  res.send(expenses);
};

const createExpence = (req, res) => {
  const { body } = req;

  const user = usersServise.getUser(body.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.newExpense(body);

  res.statusCode = 201;

  res.send(expense);
};

const findExpenceById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const removeExpence = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpense(id);

  expenseService.removeExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const updateExpence = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(expense, body);

  res.send(expense);
};

module.exports = {
  getAllExpenses,
  createExpence,
  findExpenceById,
  removeExpence,
  updateExpence,
};
