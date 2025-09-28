const express = require('express');
const { users } = require('../data/usersData');
const { expenses } = require('../data/expensesData');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(expenses);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
});

router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = users.find((u) => u.id === req.body.userId);

  if (!user) {
    return res.status(400).json({ message: 'Користувача не знайдено' });
  }

  if (
    (userId === undefined,
    spentAt === undefined || !title || amount === undefined || !category)
  ) {
    return res.status(400).json({ error: "Обов'язкові поля не заповнені" });
  }

  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ message: 'Витрату не знайдено' });
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

  res.json(expense);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
