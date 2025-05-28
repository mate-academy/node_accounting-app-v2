'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expensesRouter');
const { usersRouter } = require('./routes/usersRouter');
const { reset: resetExpenses } = require('./services/expensesService');
const { reset: resetUsers } = require('./services/usersService');

function createServer() {
  const app = express();

  app.use(cors());

  resetExpenses();
  resetUsers();

  app.use('/expenses', express.json(), expensesRouter);
  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = {
  createServer,
};
