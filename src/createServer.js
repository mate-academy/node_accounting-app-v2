'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...users.map(user => user.id));

    const newUser = {
      id: maxId > 0 ? maxId + 1 : 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (!users.find(user => user.id === Number(userId))) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== Number(userId));

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    if (Object.keys(req.query).length === 0) {
      res.send(expenses);

      return;
    }

    const { userId, category, from, to } = req.query;
    let expensesToShow = expenses;

    if (userId) {
      expensesToShow = expensesToShow
        .filter(expense => expense.userId === Number(userId));
    }

    if (category) {
      expensesToShow = expensesToShow
        .filter(expense => expense.category === category);
    }

    if (from) {
      expensesToShow = expensesToShow
        .filter(expense => expense.spentAt > from);
    }

    if (to) {
      expensesToShow = expensesToShow
        .filter(expense => expense.spentAt < to);
    }

    res.send(expensesToShow);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser || Object.keys(req.body) < 6) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...expenses.map(expense => expense.id));

    const newExpense = {
      id: maxId > 0 ? maxId + 1 : 1,
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filtered = expenses
      .filter(expense => expense.id !== Number(expenseId));

    if (filtered.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filtered;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!Object.keys(req.body).length) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, { ...req.body });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
