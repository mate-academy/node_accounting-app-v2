'use strict';

const express = require('express');

function validateId(req, res, next) {
  const userId = Number(req.params.id);

  if (userId < 0 || Number.isNaN(userId)) {
    return res.status(400).send('Bad request');
  }

  req.id = userId;

  next();
}

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.set('json spaces', 2);

  // users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const name = req.body?.name?.trim();

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;
    const user = { name: name, id: maxId + 1 };

    users.push(user);
    res.status(201).send(user);
  });

  app.get('/users/:id', validateId, (req, res) => {
    const user = users.find((u) => u.id === req.id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', validateId, (req, res) => {
    const userIndex = users.findIndex((u) => u.id === req.id);

    if (userIndex === -1) {
      res.status(404).send('Not found');

      return;
    }

    users.splice(userIndex, 1);

    res.status(204).end();
  });

  app.patch('/users/:id', validateId, (req, res) => {
    const user = users.find((u) => u.id === req.id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    const name = req.body?.name?.trim();

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    user.name = name;

    res.json(user);
  });

  // expenses
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    if (from) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const userExists = users.some((u) => u.id === userId);

    const invalidUserId = !Number.isInteger(userId) || userId < 0;
    const invalidSpentAt = !spentAt || Number.isNaN(Date.parse(spentAt));
    const invalidTitle = typeof title !== 'string' || !title.trim();
    const invalidAmount = !Number.isInteger(amount) || amount < 0;
    const invalidCategory = typeof category !== 'string' || !category.trim();
    const invalidNote = note !== undefined && typeof note !== 'string';

    if (
      invalidUserId ||
      !userExists ||
      invalidSpentAt ||
      invalidTitle ||
      invalidAmount ||
      invalidCategory ||
      invalidNote
    ) {
      return res.status(400).send('Bad request');
    }

    const maxId = expenses.length ? Math.max(...expenses.map((e) => e.id)) : 0;

    const expense = {
      id: maxId + 1,
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

  app.get('/expenses/:id', validateId, (req, res) => {
    const exp = expenses.find((e) => e.id === req.id);

    if (!exp) {
      res.status(404).send('Not found');

      return;
    }

    res.send(exp);
  });

  app.delete('/expenses/:id', validateId, (req, res) => {
    const expIndex = expenses.findIndex((e) => e.id === req.id);

    if (expIndex === -1) {
      res.status(404).send('Not found');

      return;
    }

    expenses.splice(expIndex, 1);

    res.status(204).end();
  });

  app.patch('/expenses/:id', validateId, (req, res) => {
    const exp = expenses.find((e) => e.id === req.id);

    if (!exp) {
      return res.status(404).send('Not found');
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt !== undefined && Number.isNaN(Date.parse(spentAt))) {
      return res.status(400).send('Bad request');
    }

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).send('Bad request');
    }

    if (amount !== undefined && (!Number.isInteger(amount) || amount < 0)) {
      return res.status(400).send('Bad request');
    }

    if (
      category !== undefined &&
      (typeof category !== 'string' || !category.trim())
    ) {
      return res.status(400).send('Bad request');
    }

    if (note !== undefined && typeof note !== 'string') {
      return res.status(400).send('Bad request');
    }

    Object.assign(exp, req.body);

    res.json(exp);
  });

  return app;
}

module.exports = {
  createServer,
};
