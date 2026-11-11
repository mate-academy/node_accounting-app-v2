'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const expenses = [];
  const users = [];

  let nextId = 1;

  app.use(express.json());

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    const filteredExpenses = expenses.filter((expense) => {
      const matchesUser =
        userId === undefined || expense.userId === Number(userId);

      const matchesCategory =
        categories === undefined || categories.includes(expense.category);

      const matchesFrom =
        from === undefined || new Date(expense.spentAt) >= new Date(from);

      const matchesTo =
        to === undefined || new Date(expense.spentAt) <= new Date(to);

      return matchesUser && matchesCategory && matchesFrom && matchesTo;
    });

    res.status(200).json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined
    ) {
      return res.status(400).send('Bad request');
    }

    const user = users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).send('Bad request');
    }

    const expense = {
      id: nextId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    expenses.splice(index, 1);

    return res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    expenses[index] = {
      ...expenses[index],
      ...req.body,
    };

    return res.status(200).json(expenses[index]);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (name === undefined) {
      return res.status(400).send('Bad request');
    }

    const user = {
      id: nextId++,
      name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    users.splice(index, 1);

    return res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    users[index] = {
      ...users[index],
      ...req.body,
    };

    return res.status(200).json(users[index]);
  });

  return app;
}

module.exports = {
  createServer,
};
