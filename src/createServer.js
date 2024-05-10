'use strict';

const express = require('express');
const app = express();
const { getId } = require('./getId');

function createServer() {
  let users = [];
  let expenses = [];

  app.get('/users', async (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: getId(),
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string' || name.length === 0) {
      res.sendStatus(400);

      return;
    }

    Object.assign(user, { name });
    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    users = users.filter((u) => u.id !== Number(id));
    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, category } = req.query;

    const filteredExpenses = expenses.filter((e) => {
      if (userId) {
        return e.userId === Number(userId);
      }

      if (from && to) {
        return (
          new Date(e.spentAt).getTime() >= new Date(from).getTime() &&
          new Date(e.spentAt).getTime() <= new Date(to).getTime()
        );
      }

      if (category) {
        return e.category === category;
      }
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((u) => u.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, title, category, note, amount, spentAt } = req.body;

    if (!userId || !title || !category || !amount || !spentAt) {
      return res.status(400).send('Missing required fields');
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: getId(),
      userId,
      spentAt,
      title,
      amount: Number(amount),
      category,
      note,
    };

    expenses.push(expense);

    res.status(201).send(expense);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find((u) => u.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (
      (spentAt && typeof spentAt !== 'string') ||
      (title && typeof title !== 'string') ||
      (amount && typeof amount !== 'number') ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string')
    ) {
      res.sendStatus(400);

      return;
    }

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((u) => u.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter((u) => u.id !== Number(id));
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
