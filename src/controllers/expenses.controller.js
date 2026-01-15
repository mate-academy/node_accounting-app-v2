'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.json(expenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = usersService.getById(userId);

  if (!user || !userId) {
    res.status(400).json({ error: 'User not found' });

    return;
  }

  if (!spentAt || !title || !amount || !category || !note) {
    res.status(400).json({ error: 'Missing required fields' });

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.json(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  if (!spentAt && !title && !amount && !category && !note) {
    res.status(400).json({ error: 'At least one field is required' });

    return;
  }

  const updatedExpense = expensesService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
