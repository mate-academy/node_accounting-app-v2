'use strict';

const express = require('express');

function createServer() {
  const expenses = [];
  const users = [];
  let nextExpenseId = 0;
  let nextCategoryId = 0;

  const app = express();

  app.use(express.json());

  app.get('/', async (req, res) => {});

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.sendStatus(400);
    }

    const exampleusers = {
      name: name,
      id: nextCategoryId++,
    };

    users.push(exampleusers);

    return res.status(201).json(exampleusers);
  });

  app.get('/users', (req, res) => {
    return res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingId = users.find((i) => i.id === id);

    if (!findingId) {
      return res.sendStatus(404);
    }

    return res.status(200).json(findingId);
  });

  app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingId = users.find((i) => i.id === id);

    if (!findingId) {
      return res.sendStatus(404);
    }

    if (!req.body.name) {
      return res.sendStatus(400);
    }

    findingId.name = req.body.name;

    return res.status(200).json(findingId);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingIndex = users.findIndex((i) => i.id === id);

    if (findingIndex === -1) {
      return res.sendStatus(404);
    }

    users.splice(findingIndex, 1);

    return res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.get('/expenses', (req, res) => {
    return res.status(200).json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingId = expenses.find((i) => i.id === id);

    if (!findingId) {
      return res.sendStatus(404);
    }

    return res.status(200).json(findingId);
  });

  app.put('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingId = expenses.find((i) => i.id === id);

    if (!findingId) {
      return res.sendStatus(404);
    }

    if (
      !req.body.title ||
      !req.body.amount ||
      !req.body.spentAt ||
      !req.body.userId ||
      !req.body.category
    ) {
      return res.sendStatus(400);
    }

    findingId.userId = req.body.userId;
    findingId.spentAt = req.body.spentAt;
    findingId.note = req.body.note;
    findingId.title = req.body.title;
    findingId.amount = req.body.amount;
    findingId.category = req.body.category;

    return res.status(200).json(findingId);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const findingIndex = expenses.findIndex((i) => i.id === id);

    if (findingIndex === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(findingIndex, 1);

    return res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
