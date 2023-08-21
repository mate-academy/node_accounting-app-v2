'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const users = [];
  const expenses = [];

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }
    Object.assign(user, req.body);
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === Number(req.params.id));

    if (index === -1) {
      return res.sendStatus(404);
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const user = users.find(u => u.id === Number(userId));

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let results = expenses;

    if (userId) {
      results = results.filter(e => e.userId === Number(userId));
    }

    if (from || to) {
      results = results.filter(e => {
        const expenseDate = new Date(e.spentAt);
        const startDate = new Date(from);
        const endDate = new Date(to);

        return expenseDate >= startDate && expenseDate <= endDate;
      });
    }

    if (categories) {
      results = results.filter(e => e.category === categories);
    }

    res.json(results);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }
    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }
    Object.assign(expense, req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(e => e.id === Number(req.params.id));

    if (index === -1) {
      return res.sendStatus(404);
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
