'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(express.json());
  app.use(cors());

  const users = [];
  const expenses = [];

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: users.length + 1,
      name: name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = users.find((us) => id === us.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = users.findIndex((us) => us.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = users.find((us) => id === us.id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (name !== undefined) {
      user.name = name;
    }

    res.json(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      result = result.filter((ex) => ex.userId === Number(userId));
    }

    if (categories !== undefined) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((ex) => categoryList.includes(ex.category));
    }

    if (from !== undefined) {
      result = result.filter((ex) => new Date(ex.spentAt) >= new Date(from));
    }

    if (to !== undefined) {
      result = result.filter((ex) => new Date(ex.spentAt) <= new Date(to));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const isInvalid =
      userId === undefined ||
      spentAt === undefined ||
      !title ||
      amount === undefined ||
      category === undefined;

    if (isInvalid) {
      return res.sendStatus(400);
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      return res.sendStatus(400);
    }

    const maxId = expenses.reduce((max, ex) => Math.max(max, ex.id), 0);

    const newExp = {
      id: maxId + 1,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    expenses.push(newExp);
    res.status(201).json(newExp);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((ex) => id === ex.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = expenses.findIndex((ex) => ex.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((ex) => id === ex.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (userId !== undefined) {
      expense.userId = Number(userId);
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = Number(amount);
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
