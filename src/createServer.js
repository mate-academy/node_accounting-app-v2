/* eslint-disable no-console */
'use strict';

const express = require('express');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === +id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const user = {
      id: users.length + 1, name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((u) => u.id === +id);

    if (index === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(index, 1);

    res.status(204).send('User deleted');
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((u) => u.id === +id);

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    user.name = name;

    res.status(200).send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId && !categories) {
      const userExpenses = expenses
        .filter((e) => e.userId === +userId);

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const dateExpenses = expenses
        .filter((e) => e.spentAt >= from && e.spentAt <= to);

      res.send(dateExpenses);

      return;
    }

    if (categories) {
      const categoryExpenses = expenses
        .filter((e) => e.category === categories);

      res.send(categoryExpenses);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.status(200).send(expense);
  });

  app.post('/expenses', (req, res) => {
    const { title, amount, spentAt, userId } = req.body;

    if (!title || !amount || !spentAt) {
      res.status(400).send('All fields are required');

      return;
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const expense = {
      id: expenses.length + 1, ...req.body,
    };

    expenses.push(expense);

    res.status(201).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex((e) => e.id === +id);

    if (index === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(index, 1);

    res.status(204).send('Expense deleted');
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    Object.assign(expense, req.body);

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
