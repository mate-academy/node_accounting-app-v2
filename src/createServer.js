'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.post('/users', (req, res) => {
    if (!req.body.name) {
      return res.sendStatus(400);
    }

    const user = {
      id: users.length,
      name: req.body.name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    const index = users.indexOf(user);

    users.splice(index, 1);

    res.status(204).end();
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    res.status(200).send(user);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId == null || !title || amount == null || !category) {
      return res.sendStatus(400);
    }

    const userExists = users.some(user => user.id === userId);

    if (!userExists) {
      return res.sendStatus(400);
    }

    const expense = {
      id: expenses.length,
      userId,
      spentAt: spentAt || new Date().toISOString(),
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(expense);

    res.status(201).send(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let results = expenses;

    if (userId != null) {
      results = results.filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      results = results.filter(expense =>
        categories.includes(expense.category)
      );
    }

    if (from) {
      const fromDate = new Date(from);

      results = results.filter(expense =>
        new Date(expense.spentAt) >= fromDate
      );
    }

    if (to) {
      const toDate = new Date(to);

      results = results.filter(expense =>
        new Date(expense.spentAt) <= toDate
      );
    }

    res.status(200).send(results);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    const index = expenses.indexOf(expense);

    expenses.splice(index, 1);

    res.status(204).end();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount != null) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
