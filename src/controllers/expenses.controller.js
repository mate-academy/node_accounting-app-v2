'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const allExpenses = expensesService.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  res.status(200).json(allExpenses);
};

const createExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = usersService.getById(Number(userId));

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).json({ message: 'Params is required' });

    return;
  }

  if (!user) {
    res.status(400).json({ message: 'User not found' });

    return;
  }

  const newExpenses = expensesService.createExpenses({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpenses);
};

const getById = (req, res) => {
  const id = Number(req.params.id);

  const foundExpenses = expensesService.getById(id);

  if (!foundExpenses) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(foundExpenses);
};

const updateExpenses = (req, res) => {
  const id = Number(req.params.id);
  const expenseData = req.body;

  const updatedExpenses = expensesService.updateExpenses(id, expenseData);

  if (!updatedExpenses) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(updatedExpenses);
};

const deleteExpenses = (req, res) => {
  const id = Number(req.params.id);

  const deletedExpenses = expensesService.deleteById(id);

  if (!deletedExpenses) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(204).end();
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getById,
  updateExpenses,
  deleteExpenses,
};
