'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.js');
const { expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();
  const expenses = [];
  const users = [];

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  usersRouter(userRouter, users);
  expensesRouter(expenseRouter, expenses, users);

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
