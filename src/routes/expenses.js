const express = require('express');

module.exports = function (users, expenses) {
  const router = express.Router();

  let nextId = 1;

  router.post('/', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined ||
      note === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: nextId++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  router.get('/', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filtered = [...expenses];

    if (userId) {
      filtered = filtered.filter((e) => String(e.userId) === String(userId));
    }

    if (from && to) {
      filtered = filtered.filter((e) => e.spentAt >= from && e.spentAt <= to);
    }

    if (categories) {
      const cats = categories.split(',');

      filtered = filtered.filter((e) => cats.includes(e.category));
    }

    res.json(filtered);
  });

  router.get('/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  });

  router.patch('/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
    const updates = Object.keys(req.body);

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid fields in update' });
    }

    updates.forEach((field) => {
      expense[field] = req.body[field];
    });

    res.json(expense);
  });

  router.delete('/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);

    res.status(204).end();
  });

  return router;
};
