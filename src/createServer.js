/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');

function createServer() {
  const users = [];
  const expenses = [];
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    if (!req.body.name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: users.length + 1,
      name: req.body.name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id, 10));

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(
      (u) => u.id === parseInt(req.params.id, 10),
    );

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }
    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id, 10));

    if (!user) {
      return res.status(404).send('User not found');
    }
    Object.assign(user, req.body);
    res.json(user);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      result = result.filter(
        (expense) => expense.userId === Number(req.query.userId),
      );
    }

    if (req.query.categories) {
      const categories = req.query.categories.split(',');

      result = result.filter((expense) =>
        categories.includes(expense.category),
      );
    }

    if (req.query.from && req.query.to) {
      const fromDate = new Date(req.query.from);
      const toDate = new Date(req.query.to);

      result = result.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    if (
      !req.body.userId ||
      !req.body.spentAt ||
      !req.body.title ||
      !req.body.amount
    ) {
      return res.status(400).send('All fields are required');
    }

    const user = users.find((u) => u.id === req.body.userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: expenses.length + 1,
      userId: req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id, 10));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.json(expense);
    res.status(200).send();
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (e) => e.id === parseInt(req.params.id, 10),
    );

    if (expenseIndex === -1) {
      return res.status(404).send('Expense not found');
    }
    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id, 10));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    Object.assign(expense, req.body);
    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
