const express = require('express');

module.exports = function (users, expenses) {
  const router = express.Router();

  let nextId = 1;

  router.post('/', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
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
      return res.status(404).end();
    }
    res.json(expense);
  });

  router.patch('/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).end();
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  router.delete('/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).end();
    }

    expenses.splice(index, 1);
    res.status(204).end();
  });

  return router;
};
