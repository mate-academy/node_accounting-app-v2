'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');
const { createUsers } = require('./services/users.service');
const { createExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  createUsers();
  createExpenses();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
