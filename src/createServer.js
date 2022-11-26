'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
