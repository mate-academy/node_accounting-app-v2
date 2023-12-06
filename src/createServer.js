'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users.router');
const { router: expenseRouter } = require('./routes/expenses.router');
const { resetUsers } = require('./servises/users.servise');
const { resetExpenses } = require('./servises/expenses.servise');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
