/* eslint-disable no-shadow */
'use strict';

const express = require('express');
const cors = require('cors');
const {
  init,
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('./services/user');

const {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpenses,
  initExpenses,
} = require('./services/expenses');

function createServer() {
  // const router = require('./routers/user');
  const app = express();

  app.use(cors());
  init();
  initExpenses();

  app.get('/users', (req, res) => {
    const users = getAll();

    res.send(users);
    res.statusCode = 200;
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    removeUser(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    updateUser({ id: userId, name });

    res.send(foundUser);
    res.statusCode = 200;
  });

  // -----------------------EXTENSE------------------------

  app.post('/expenses', express.json(), (req, res) => {
    const expenseData = req.body;
    const { userId } = expenseData;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExtense = createNewExpenses(expenseData);

    res.statusCode = 201;
    res.send(newExtense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpens = getExpenseById(expenseId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpens);
  });

  app.get('/expenses', (req, res) => {
    const expenses = getAllExpenses();
    const query = req.query;
    const { userId, category, to, from } = query;

    if (from && to) {
      const foundExpensesByDate = expenses.filter(
        (expense) => expense.spentAt > from
        && expense.spentAt < to
      );

      res.send(foundExpensesByDate);
      res.statusCode = 200;

      return;
    }

    if (category) {
      const foundExpensesByCategory = expenses.filter(
        (expense) =>
          expense.userId === +query.userId
          && expense.category === query.category
      );

      res.send(foundExpensesByCategory);
      res.statusCode = 200;

      return;
    }

    if (userId) {
      const foundExpensesByUserId = expenses.filter(
        (expense) => expense.userId === +userId
      );

      res.send(foundExpensesByUserId);
      res.statusCode = 200;

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = getExpenseById(expenseId);

    if (!filteredExpenses) {
      res.sendStatus(404);

      return;
    }

    removeExpenses(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpenses = getExpenseById(expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    updateExpenses({ expenseId, title });

    res.send(foundExpenses);
    res.statusCode = 200;
  });

  return app;
}

module.exports = {
  createServer,
};
