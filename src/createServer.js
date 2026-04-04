'use strict';

const express = require('express');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: Date.now(),
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    res.json(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = expenses;

    if (userId) {
      result = result.filter((e) => e.userId === parseInt(userId));
    }

    if (categories) {
      result = result.filter((e) => e.category === categories);
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: 'User ID and amount are required' });
    }

    const user = users.find((u) => u.id === parseInt(userId));

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: Date.now(),
      userId: parseInt(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === parseInt(id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseIndex = expenses.findIndex((e) => e.id === parseInt(id));

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const expense = expenses.find((e) => e.id === parseInt(id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
