'use strict';

const express = require('express');
const { usersRoute } = require('./users');
const { expensesRoute } = require('./expenses');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];

  app.use(express.json());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  usersRoute(userRouter, users);
  expensesRoute(expenseRouter, users, expenses);

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = { createServer };
