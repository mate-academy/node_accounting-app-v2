'use strict';

const express = require('express');
const { expensesRouter } = require('./routes/expenses');
const { usersRouter } = require('./routes/users');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
