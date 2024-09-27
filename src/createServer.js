'use strict';

const express = require('express');
const { usersRouter } = require('./models/user/user.router');
const { expensesRouter } = require('./models/expenses/expenses.router');

function createServer() {
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
