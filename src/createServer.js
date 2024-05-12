'use strict';

const express = require('express');

let users = [];
const expensesArray = [];

function getNextId(array) {
  if (array.length === 0) {
    return 1;
  } else {
    const maxId = Math.max(...array.map((obj) => obj.id));

    return maxId + 1;
  }
}

function getUserById(userId) {
  return users.find((user) => user.id === userId) || null;
}

let expenses = expensesArray.map((expense) => ({
  ...expense,
  user: getUserById(expense.userId),
}));

function createServer() {
  const app = express();

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
      id: getNextId(users),
      userId: getNextId(users),

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

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((item) => item.id === parseInt(id));

    if (!user) {
      res.sendStatus(404);
    }
    res.statusCode = 200;
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const user = {
      id: getNextId(users),
      name,
    };

    res.statusCode = 201;
    users.push(user);
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    // const user = users.find((item) => item.id === parseInt(id));

    // if (!user) {
    //   res.sendStatus(404);

    //   return;
    // }

    const newUsers = users.filter((item) => item.id !== parseInt(id));

    if (newUsers.length === users.length) {
      res.sendStatus(404);
    }

    users = newUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((item) => item.id === parseInt(id));

    if (!user) {
      res.sendStatus(400);
    }

    if (typeof name !== 'string') {
      res.status(422);
    }

    Object.assign(user, { name });

    res.send(user);
  });

  return app;
}

module.exports = {
  createServer,
};
