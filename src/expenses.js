'use strict';

const { getExpenses, getExpenseById, createExpense } = require('../models');

function getExpensesController(req, res) {
  const expenses = getExpenses();

  res.json(expenses);
}

function getExpenseByIdController(req, res) {
  const { expenseId } = req.params;
  const expense = getExpenseById(expenseId);

  if (expense) {
    res.json(expense);
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
}

function createExpenseController(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const newExpense = createExpense(
    userId, spentAt, title, amount, category, note
  );

  if (newExpense) {
    res.status(201).json(newExpense);
  } else {
    res.status(400).json({ error: 'Failed to create expense' });
  }
}

module.exports = {
  getExpenses: getExpensesController,
  getExpenseById: getExpenseByIdController,
  createExpense: createExpenseController,
};
