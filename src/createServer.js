const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  let userIdCount = 1;
  let expenseId = 1;

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filtered = [...expenses];

    if (userId) {
      filtered = filtered.filter((x) => x.userId === +userId);
    }

    if (categories) {
      filtered = filtered.filter((x) => x.category === categories);
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (from) {
      filtered = filtered.filter((e) => fromDate <= new Date(e.spentAt));
    }

    if (to) {
      filtered = filtered.filter((e) => new Date(e.spentAt) <= toDate);
    }

    return res.status(200).json(filtered);
  });

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
      id: userIdCount,
      name,
    };

    users.push(newUser);
    userIdCount++;

    res.status(201).json(newUser);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === null ||
      spentAt === null ||
      title === null ||
      !Number.isFinite(+amount) ||
      category === null ||
      note === null
    ) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const user = users.find((x) => x.id === +userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: expenseId,
      userId: +userId,
      spentAt,
      title,
      amount: +amount,
      category,
      note,
    };

    expenses.push(newExpense);
    expenseId++;

    res.status(201).json(newExpense);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === +req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  app.delete('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter((u) => u.id !== +req.params.id);

    res.status(204).end();
  });

  app.delete('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === +req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses = expenses.filter((u) => u.id !== +req.params.id);
    res.status(204).end();
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);
    const name = req.body.name;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === +req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    Object.assign(expense, req.body, { id: expense.id });
    res.status(200).json(expense);
  });

  return app;
}

module.exports = { createServer };
