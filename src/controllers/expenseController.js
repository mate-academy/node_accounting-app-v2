/* eslint-disable no-console */
'use strict';

const { ExpenseService } = require('../services/expenseService');
const expenseService = new ExpenseService();
const userService = require('../services/userService');

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!spentAt || !title || !amount || !category || !note || !userId) {
    return res.status(400).send('All fields are required');
  }

  const user = userService.getAllUsers({ id: userId });

  if (user.length === 0) {
    return res.status(400).send('Bad Request');
  }

  const newExpense = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(newExpense);
}

function getAllExpenses(req, res) {
  const expenses = expenseService.getAllExpenses(req.query);

  res.json(expenses);
}

function getExpense(req, res) {
  const [expense] = expenseService.getAllExpenses({
    id: parseInt(req.params.id),
  });

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.json(expense);
}

function updateExpense(req, res) {
  const expense = expenseService.updateExpense({
    ...req.body,
    id: parseInt(req.params.id),
  });

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.json(expense);
}

function deleteExpense(req, res) {
  const success = expenseService.deleteExpense(parseInt(req.params.id));

  if (!success) {
    return res.status(404).send('Expense not found');
  }
  res.status(204).send();
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
