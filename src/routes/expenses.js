const express = require('express');

const router = express.Router();

let expenses = [
  {
    id: 1,
    userId: 1,
    category: 'food',
    amount: 50,
    spentAt: '2025-09-20T12:00:00Z',
  },
  {
    id: 2,
    userId: 1,
    category: 'transport',
    amount: 20,
    spentAt: '2025-09-21T08:30:00Z',
  },
  {
    id: 3,
    userId: 2,
    category: 'food',
    amount: 30,
    spentAt: '2025-09-21T09:00:00Z',
  },
];

router.get('/', (req, res) => {
  res.json(expenses);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ message: 'Витрату не знайдено' });
  }

  res.json(expense);
});

router.post('/', (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (userId === undefined || !title || amount === undefined || !category) {
    return res.status(400).json({ error: "Обов'язкові поля не заповнені" });
  }

  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt: new Date().toISOString(),
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

  const expenseExists = expenses.some((u) => u.id === id);

  if (!expenseExists) {
    return res.status(404).json({ message: 'Витрати не знайдено' });
  }

  expenses = expenses.filter((e) => e.id !== id);

  res.status(200).json({ message: 'Витрату видалено' });
});

module.exports = router;
