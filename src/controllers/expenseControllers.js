'use strict';

const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

const getAllExpenses = (req, res) => {
  res.send(expenseService.getAll(req.query));
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (
    !userService.getById(userId) ||
    !spentAt ||
    !title ||
    !amount ||
    !category
  ) {
    return res.sendStatus(400);
  }

  res.status(201);
  res.send(expenseService.create(req.body));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const updateExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expenseService.updateById(id, req.body));
};

const removeExpenseById = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.removeById(id);
  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  removeExpenseById,
};
