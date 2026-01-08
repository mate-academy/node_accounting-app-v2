'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let userIdCounter = 1;
  let expenseIdCounter = 1;

  const isValidId = (id) => Number.isInteger(id) && id > 0;

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Bad request');
    }

    const user = {
      id: userIdCounter++,
      name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!isValidId(id) || !name) {
      return res.status(400).send('Bad request');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    user.name = name;

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    const { userId, categories, from, to } = req.query;

    if (userId !== undefined) {
      const uid = Number(userId);

      result = result.filter((e) => e.userId === uid);
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((e) => categoryList.includes(e.category));
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    res.json(result);
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
      return res.status(400).send('Bad request');
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('Bad request');
    }

    const expense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send('Bad request');
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    expenses.splice(index, 1);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
