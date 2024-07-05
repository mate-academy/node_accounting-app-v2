'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');
const { usersReset } = require('./services/users.service');
const { expensesReset } = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  usersReset();
  expensesReset();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
