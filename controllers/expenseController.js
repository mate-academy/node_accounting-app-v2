'use strict';

const expensesService = require('../services/expenseService');
const { getUserById } = require('../services/userService');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = expensesService.getExpenses(
    userId, categories, from, to);

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.statusCode = 404;
    res.send('Expenses not found');

    return;
  }
  res.statusCode = 200;
  res.send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (typeof userId !== 'number' || !getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  if (isNaN(Date.parse(spentAt)) || !spentAt
  || typeof title !== 'string' || !title
  || typeof amount !== 'number' || !amount
  || typeof category !== 'string' || !category
  ) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(userId)) {
    res.sendStatus = (400);

    return;
  }

  const expense = expensesService.createExpense(
    userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (
    (isNaN(Date.parse(spentAt)) && spentAt)
  || (typeof title !== 'string' && title)
  || (typeof amount !== 'number' && amount)
  || (typeof category !== 'string' && category)
  ) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.updateExpense(
    id, spentAt, title, amount, category, note);

  if (!updatedExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const result = expensesService.deleteExpense(id);

  if (!result) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
