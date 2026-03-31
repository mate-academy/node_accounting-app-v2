const express = require('express');
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expenses.service.js');

const expensesRoute = express.Router();

expensesRoute.get('/', async (req, res) => {
  const expenses = await getAll();

  res.send(expenses);
});

expensesRoute.get('/:id', async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(expense);
});

expensesRoute.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId == null ||
    spentAt == null ||
    title == null ||
    amount == null ||
    category == null
  ) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const user = await getById(userId);

  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  if (typeof amount !== 'number' || Number.isNaN(new Date(spentAt).getTime())) {
    return res.status(400).send({ message: 'Invalid field' });
  }

  const expense = await create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
});

expensesRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const expense = await remove(id);

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(204).send();
});

expensesRoute.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId == null ||
    spentAt == null ||
    title == null ||
    amount == null ||
    category == null
  ) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  if (typeof amount !== 'number' || Number.isNaN(new Date(spentAt).getTime())) {
    return res.status(400).send({ message: 'Invalid field' });
  }

  const expense = await update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!expense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(200).send(expense);
});

module.exports = { expensesRoute };
