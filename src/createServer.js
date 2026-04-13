'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  let expenses = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    users = users.filter((u) => u.id !== id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id) || !name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.name = name;

    res.status(200).send(user);
  });

  app.get('/expenses', (req, res) => {
    let filtered = expenses;

    const { userId, categories, from, to } = req.query;

    if (userId) {
      filtered = filtered.filter((e) => e.userId === Number(userId));
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      filtered = filtered.filter((e) => cats.includes(e.category));
    }

    if (from) {
      filtered = filtered.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      filtered = filtered.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.status(200).send(filtered);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expense);
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
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(expense);

    res.status(201).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter((e) => e.id !== id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (userId != null) {
      const user = users.find((u) => u.id === Number(userId));

      if (!user) {
        res.sendStatus(404);

        return;
      }

      expense.userId = Number(userId);
    }

    if (spentAt != null) {
      expense.spentAt = spentAt;
    }

    if (title != null) {
      expense.title = title;
    }

    if (amount != null) {
      expense.amount = amount;
    }

    if (category != null) {
      expense.category = category;
    }

    if (note != null) {
      expense.note = note;
    }

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
