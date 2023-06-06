'use strict';

const express = require('express');

const { clearExpenses } = require('./services/expenses');
const { clearUsers } = require('./services/users');
const { userRouter } = require('./routes/usersRoute');
const { expensesRouter } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
