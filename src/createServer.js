'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.get('/users', (req, res) => res.json(users));

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const newUser = { id: Date.now(), name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send();
    }
    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send();
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    const { userId, category, categories, from, to } = req.query;

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    const categoryFilter = category || categories;

    if (categoryFilter) {
      result = result.filter((e) => e.category === categoryFilter);
    }

    if (from) {
      result = result.filter((e) => e.spentAt >= from);
    }

    if (to) {
      result = result.filter((e) => e.spentAt <= to);
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { amount, category, userId, title, note, spentAt } = req.body;

    if (!amount || !category || !userId) {
      return res.status(400).send();
    }

    if (!users.some((u) => u.id === Number(userId))) {
      return res.status(400).send();
    }

    const newExpense = {
      id: Date.now(),
      amount,
      category,
      userId: Number(userId),
      title: title || null,
      note: note || null,
      spentAt: spentAt || new Date().toISOString(),
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send();
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }
    Object.assign(expense, req.body);

    if (req.body.userId) {
      expense.userId = Number(req.body.userId);
    }
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
