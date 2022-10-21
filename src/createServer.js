'use strict';

const { getUserById,
  postUser,
  deleteUser,
  updateUser } = require('./services/users');
const { postExpense,
  getExpenseById,
  getExpenses,
  deleteExpense,
  updateExpense } = require('./services/expenses');
const express = require('express');

function createServer() {
  const app = express();

  // let users = [{
  //   id: 1,
  //   name: 'computer',
  // }];

  // let users = [];

  // const expenses = [{
  //   userId: 1, category: 'computer5',
  // }, {
  //   userId: 100, category: 'oldich',
  // }];

  let expenses = [];
  let users = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = postUser(name, users);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;

    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = getUserById(userId, users);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = getUserById(+userId, users);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = deleteUser(userId, users);

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = getUserById(userId, users);

    if (!name) {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    updateUser(userId, name, users);
    res.send(foundUser);
  });
  // ////////

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;

    const user = getUserById(+userId, users);
    const expense = postExpense(req.body, expenses);

    if (user === null) {
      // console.log(user);
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses', (req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const copy = getExpenses(normalizedURL, expenses);

    res.statusCode = 200;

    if (normalizedURL.search) {
      res.send(copy);
    } else {
      res.send(expenses);
    }
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = getExpenseById(+expenseId, expenses);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const newExpenses = deleteExpense(expenseId, expenses);

    if (expenses.length === newExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = getExpenseById(expenseId, expenses);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!title) {
      res.sendStatus(400);

      return;
    }

    updateExpense(foundExpense, title);
    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
