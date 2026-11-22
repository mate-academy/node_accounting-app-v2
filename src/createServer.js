'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: nextUserId++,
      name: name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    const index = users.findIndex((item) => item.id === user.id);

    users.splice(index, 1);

    res.sendStatus(204).json(user);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const updatedUsers = req.body;

    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    Object.assign(user, updatedUsers);

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categories,
      );
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expens = expenses.find((item) => item.id === Number(req.params.id));

    if (!expens) {
      return res.sendStatus(404);
    }

    res.send(expens);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expens = expenses.find((item) => item.id === Number(req.params.id));

    if (!expens) {
      return res.sendStatus(404);
    }

    const index = expenses.findIndex((item) => item.id === expens.id);

    expenses.splice(index, 1);

    res.sendStatus(204).json(expens);
  });

  app.patch('/expenses/:id', (req, res) => {
    const updatedExpenses = req.body;

    const expens = expenses.find((item) => item.id === Number(req.params.id));

    if (!expens) {
      return res.sendStatus(404);
    }

    Object.assign(expens, updatedExpenses);

    res.send(expens);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = users.find((item) => item.id === Number(userId));

    if (!user) {
      return res.sendStatus(400);
    }

    if (!userId) {
      return res.sendStatus(400);
    }

    if (!spentAt) {
      return res.sendStatus(400);
    }

    if (!title) {
      return res.sendStatus(400);
    }

    if (!amount) {
      return res.sendStatus(400);
    }

    if (!category) {
      return res.sendStatus(400);
    }

    if (!note) {
      return res.sendStatus(400);
    }

    const expense = {
      id: nextExpenseId++,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    expenses.push(expense);

    res.status(201).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
