'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.sendStatus(400);
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);
    res.status(201).send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (name === undefined || typeof name !== 'string' || name.trim() === '') {
      return res.sendStatus(400);
    }

    user.name = name;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }
    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, categories, from, to } = req.query;
    let result = [...expenses];

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    const activeCategory = category || categories;

    if (activeCategory) {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (from) {
      result = result.filter((e) => e.spentAt >= from);
    }

    if (to) {
      result = result.filter((e) => e.spentAt <= to);
    }

    res.send(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      typeof amount !== 'number' ||
      !category ||
      note === undefined
    ) {
      return res.sendStatus(400);
    }

    if (!users.some((u) => u.id === Number(userId))) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: nextExpenseId++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    Object.assign(expense, req.body);
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }
    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  app.get('/users/:id/expenses', (req, res) => {
    const userId = Number(req.params.id);

    if (!users.some((u) => u.id === userId)) {
      return res.sendStatus(404);
    }

    res.send(expenses.filter((e) => e.userId === userId));
  });

  app.get('/expenses/category/:category', (req, res) => {
    res.send(expenses.filter((e) => e.category === req.params.category));
  });

  return app;
}

module.exports = {
  createServer,
};
