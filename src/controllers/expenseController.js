'use strict';

const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  // eslint-disable-next-line
  res.json(expenseService.getAll({ userId, categories, from, to }));
};

const getExpense = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined || !category) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const user = userService.getById(Number(userId));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const expense = expenseService.create({
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.update(id, req.body);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const deleteExpense = (req, res) => {
  const id = Number(req.params.id);
  const deleted = expenseService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
