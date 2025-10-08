'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  // Use express to create a server
  // Add a routes to the server
  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter((u) => u.id !== +req.params.id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === +req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Bad request' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.get('/expenses', (req, res) => {
    let filtered = [...expenses];
    const { userId, categories, from, to } = req.query;

    if (userId) {
      const id = +userId;

      filtered = filtered.filter((exp) => exp.userId === id);
    }

    if (categories) {
      filtered = filtered.filter((exp) => categories === exp.category);
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (from && to) {
      filtered = filtered.filter(
        (e) => fromDate <= new Date(e.spentAt) && new Date(e.spentAt) <= toDate,
      );
    }

    if (from && !to) {
      filtered = filtered.filter((e) => fromDate <= new Date(e.spentAt));
    }

    if (!from && to) {
      filtered = filtered.filter((e) => new Date(e.spentAt) <= toDate);
    }

    res.status(200).json(filtered);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      spentAt == null ||
      title == null ||
      amount == null ||
      category == null
    ) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const userExists = users.some((u) => u.id === +userId);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = {
      id: expenseIdCounter++,
      userId: +userId,
      spentAt,
      title,
      amount: +amount,
      category,
      note: note || '',
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const exp = expenses.find((e) => e.id === +req.params.id);

    if (!exp) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(exp);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = +req.params.id;
    const exp = expenses.find((e) => e.id === id);

    if (!exp) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    Object.assign(exp, req.body, { id: exp.id });
    res.json(exp);
  });

  app.delete('/expenses/:id', (req, res) => {
    const exp = expenses.find((e) => e.id === +req.params.id);

    if (!exp) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expenses = expenses.filter((e) => e.id !== +req.params.id);
    res.sendStatus(204);
  });

  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
