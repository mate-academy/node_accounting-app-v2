'use strict';

const express = require('express');

const { clearExpenses } = require('./services/expenses');
const { clearUsers } = require('./services/users');
const { router: userRouter } = require('./routes/usersRoute');
const { router: expensesRouter } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
