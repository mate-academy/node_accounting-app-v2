/* eslint-disable no-shadow */
'use strict';

const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

function createServer() {
  let users = [];
  let expenses = [];
  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
    res.statusCode = 200;
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.max(0, ...users.map(({ id }) => id + 1)),
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const filteredUsers = users.filter((user) => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
    res.statusCode = 200;
  });

  // -----------------------EXTENSE------------------------

  app.post('/expenses', express.json(), (req, res) => {
    const expenseData = req.body;
    const { userId } = expenseData;

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExtense = {
      id: Math.max(0, ...users.map(({ id }) => id + 1)),
      ...expenseData,
    };

    expenses.push(newExtense);

    res.statusCode = 201;
    res.send(newExtense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpens = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpens);
  });

  app.get('/expenses', (req, res) => {
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

    const filteredExpenses = expenses.filter(
      (expense) => expense.id !== +expenseId
    );

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }
    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpenses = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    Object.assign(foundExpenses, { title });

    res.send(foundExpenses);
    res.statusCode = 200;
  });

  return app;
}

module.exports = {
  createServer,
};
