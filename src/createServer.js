'use strict';

const express = require('express');
const cors = require('cors');

function getId(arr) {
  if (arr.length === 0) {
    return 1;
  }

  const maxId = Math.max(...arr.map((user) => user.id || 0));

  return maxId + 1;
}

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(cors());
  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const foundUser = users.find((u) => u.id === id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: getId(users),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const id = Number(req.params.id);

    const foundUser = users.find((u) => u.id === id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const newUsers = users.filter((user) => user.id !== id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let result = [...expenses];

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories) {
      const categoryList = categories.split(',');

      result = result.filter((e) => categoryList.includes(e.category));
    }

    res.send(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const foundExpense = expenses.find((e) => e.id === id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.sendStatus(400);
    }

    const userExists = users.find((user) => user.id === userId);

    if (!userExists) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: getId(expenses),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const newExpenses = expenses.filter((expense) => expense.id !== id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    Object.assign(expense, req.body);
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
