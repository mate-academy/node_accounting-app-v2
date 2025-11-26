const express = require('express');
const { expenses, getNextExpenseId, users } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  let result = [...expenses];
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter((e) => e.userId === +userId);
  }

  if (categories) {
    result = result.filter((e) => categories.split(',').includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.status(200).json(result);
});

router.post('/', (req, res) => {
  const data = req.body;
  const { userId, spentAt, title, amount, category } = data;
  const user = users.find((u) => u.id === userId);

  if (!spentAt || !title || !amount || !category || !userId) {
    return res.status(400).json({ error: 'Bad request' });
  }

  if (!user) {
    return res.status(404).json({error: 'Not found'})
  }

  const expense = { ...data, id: getNextExpenseId() };

  expenses.push(expense);

  res.status(201).json(expense);
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;
  const expense = expenses.find((u) => u.id === id);

  if (!expense) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json(expense);
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const idx = expenses.findIndex((e) => e.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  expenses.splice(idx, 1);

  res.sendStatus(204);
});

router.patch('/:id', (req, res) => {
  const id = +req.params.id;
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const { spentAt, title, amount, category, note } = req.body;

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  res.status(200).json(expense);
});

module.exports = router;
