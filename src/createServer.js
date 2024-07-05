'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((people) => people.id === parseInt(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: 'Name is required' });

      return;
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((people) => people.id === parseInt(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    Object.assign(user, req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === parseInt(id));

    if (index === -1) {
      res.sendStatus(404);

      return;
    }
    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === parseInt(userId),
      );
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const spentAtDate = new Date(expense.spentAt);

        return spentAtDate >= fromDate && spentAtDate <= toDate;
      });
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses.filter((expense) =>
        // eslint-disable-next-line
        categoryList.includes(expense.category)
      );
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((item) => item.id === parseInt(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400).send({ error: 'Invalid expense data' });

      return;
    }

    const user = users.find((people) => people.id === parseInt(userId));

    if (!user) {
      res.status(400).send({ error: 'User not found' });

      return;
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((item) => item.id === parseInt(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    Object.assign(expense, req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      res.sendStatus(404);

      return;
    }
    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
