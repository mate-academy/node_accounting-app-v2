'use strict';

// const { uuid } = require('uuidv4');

const express = require('express');

function createServer() {
  const app = express();

  let expenses = [];

  let users = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
      res.send('Error');
    }

    const user = {
      name,
      id: Math.random(),
    };

    users.push(user);

    res.statusCode = 201;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter((user) => user.id !== Number(id));

    if (newUsers.length === users.length) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const { name } = req.body;

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);
    }

    user.name = name;

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let result = expenses;

    if (categories) {
      result = expenses.filter((item) => item.category === categories);
    }

    if (from && to) {
      result = expenses.filter(
        (item) => item.spentAt >= from && item.spentAt <= to,
      );
    }

    result = userId
      ? result.filter((item) => item.userId === Number(userId))
      : result;

    res.send(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === Number(id));

    if (!expense) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = users.find((item) => item.id === userId);

    if (!user) {
      res.sendStatus(400);
      res.send('Error');

      return;
    }

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: Math.random(),
    };

    expenses.push(expense);

    res.statusCode = 201;

    res.send(expense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const { title } = req.body;

    const expense = expenses.find((item) => item.id === Number(id));

    if (!expense) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    if (typeof title !== 'string') {
      res.sendStatus(400);
    }

    expense.title = title;

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter((item) => item.id !== Number(id));

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);
      res.send('Error');

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  return app;

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
