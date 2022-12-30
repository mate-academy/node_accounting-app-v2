'use strict';

// const express = require('express');
const express = require('express');

const { Expenses } = require('./services/Expenses.js');
const { Users } = require('./services/Users.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  const expenses = new Expenses();
  const users = new Users();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users.getUsers());
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.getUserById(userId);

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

      return;
    }

    res.statusCode = 201;
    res.send(users.createUser(name));
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users.deleteUser(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = users.updateUser(userId, name);

    res.statusCode = 200;
    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const searchParams = req.query;

    if (!searchParams) {
      res.send(expenses.getExpenses());

      return;
    }

    res.send(expenses.filterExpenses(searchParams));
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.getUserById(userId);

    const verifyData = foundUser && spentAt && title && amount && category;

    if (!verifyData) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    res.send(expenses.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note
    ));
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses.deleteExpense(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const body = req.body;

    const foundExpense = expenses.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!body) {
      res.sendStatus(400);

      return;
    }

    const updatedExpense = expenses.updateExpense(expenseId, body);

    res.statusCode = 200;
    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
