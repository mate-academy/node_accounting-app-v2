'use strict';

const express = require('express');

const { usersInit } = require('./services/users.service');
const { usersRouter } = require('./routes/users.route');

const { expensesInit } = require('./services/expenses.service');
const { expensesRouter } = require('./routes/expenses.route');

const app = express();

function createServer() {
  usersInit();
  expensesInit();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
