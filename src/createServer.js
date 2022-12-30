'use strict';

const express = require('express');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const { init: usersInit } = require('./services/users');
const { init: expensesInit } = require('./services/expenses');

function createServer() {
  const app = express();

  usersInit();
  expensesInit();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
