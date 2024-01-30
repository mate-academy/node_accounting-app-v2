'use strict';

const { userRouter } = require('./routes/user.router');
const { expensesRouter } = require('./routes/expenses.router');

const express = require('express');
const { reserUsers } = require('./services/users.services');
const { resetExpenses } = require('./services/expenses.services');

function createServer() {
  const app = express();

  reserUsers();
  resetExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
