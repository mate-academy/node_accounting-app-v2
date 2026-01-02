'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const expenses = [];
  const users = [];

  // --- USERS ENDPOINTS ---

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.json({ message: 'Name is required' });

      return;
    }

    const newUser = {
      id: req.body.id || Math.floor(Math.random() * 100000),
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.json(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.userId));

    if (!user) {
      res.statusCode = 404;
      res.json({ message: 'User not found' });

      return;
    }

    res.json(user);
  });

  app.patch('/users/:userId', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.userId));

    if (!user) {
      res.statusCode = 404;
      res.json({ message: 'User not found' });

      return;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    res.statusCode = 200;
    res.json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.statusCode = 404;
      res.json({ message: 'User not found' });

      return;
    }

    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      const userId = Number(req.query.userId);

      result = result.filter((e) => e.userId === userId);
    }

    if (req.query.categories) {
      result = result.filter((e) => e.category === req.query.categories);
    }

    if (req.query.from) {
      const start = new Date(req.query.from).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() >= start);
    }

    if (req.query.to) {
      const end = new Date(req.query.to).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() <= end);
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.statusCode = 400;
      res.json({ message: 'Missing required fields' });

      return;
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      res.statusCode = 400;
      res.json({ message: 'User not found' });

      return;
    }

    const newExpense = {
      id: req.body.id || Math.floor(Math.random() * 100000),
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note: req.body.note || null,
    };

    expenses.push(newExpense);
    res.statusCode = 201;
    res.json(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expense = expenses.find(
      (ex) => ex.id === Number(req.params.expenseId),
    );

    if (!expense) {
      res.statusCode = 404;
      res.json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.expenseId));

    if (!expense) {
      res.statusCode = 404;
      res.json({ message: 'Expense not found' });

      return;
    }

    Object.assign(expense, req.body);

    res.statusCode = 200;
    res.json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expenseIndex = expenses.findIndex((e) => e.id === expenseId);

    if (expenseIndex === -1) {
      res.statusCode = 404;
      res.json({ message: 'Expense not found' });

      return;
    }

    expenses.splice(expenseIndex, 1);
    res.statusCode = 204;
    res.end();
  });

  return app;
}

module.exports = {
  createServer,
};
