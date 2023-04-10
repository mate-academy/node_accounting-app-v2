'use strict';

const cors = require('cors');
const express = require('express');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', usersRouter.router);
  app.use('/expenses', expensesRouter.router);

  usersRouter.resetUsers();
  expensesRouter.resetExpenses();

  return app;
}

module.exports = {
  createServer,
};
