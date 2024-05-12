'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const { usersInit } = require('./services/users.service');

let expenses = [];

function createServer() {
  const app = express();

  usersInit();

  app.use('/users', express.json(), usersRouter);

  app.get('/expenses', (req, res) => {
    if (!expenses) {
      return [];
    }
    res.statusCode = 201;
    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === parseInt(id));

    if (!expense) {
      res.sendStatus(400);

      return;
    }
    res.statusCode = 201;
    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, amount, category, note } = req.body;

    if (!title || !amount || !category || !note) {
      res.sendStatus(400);
    }

    const expense = {
      // id: getCreateMaxId(users),
      // userId: getCreateMaxId(users),

      spentAt: new Date().toISOString(),
      title,
      amount,
      category,
      note,
    };

    res.statusCode = 201;
    expenses.push(expense);
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter((item) => item.id !== parseInt(id));

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
