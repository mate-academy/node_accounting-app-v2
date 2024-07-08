'use strict';

const express = require('express');

const { usersRouter } = require('./routes/users.router.js');
const { expensesRouter } = require('./routes/expense.router.js');
const { usersReset } = require('./services/user.services.js');
const { expensesReset } = require('./services/expense.services');

function createServer() {
  const app = express();

  app.use(express.json());

  usersReset();
  expensesReset();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = { createServer };
