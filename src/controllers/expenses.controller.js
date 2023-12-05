'use strict';

const expenseService = require('../services/expenses.service');
const getUser = require('../services/users.service').getUserById;

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(expenseService.getAllExpenses(userId, from, to, categories));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpenseById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = getUser(+userId);

  if (!title || !user) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  res.send(expenseService.createExpense(expense));
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpenseById(+id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(+id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!expenseService.getExpenseById(+id)) {
    res.sendStatus(404);

    return;
  }

  const expenseUpdate = expenseService.updateExpense({
    id: +id,
    title,
  });

  if (expenseUpdate.errorCode) {
    res.sendStatus(expenseUpdate.errorCode);

    return;
  }

  res.send(expenseUpdate);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
