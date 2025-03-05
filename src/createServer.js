'use strict';

const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');
const { resetExpenses } = require('./services/expenses.service');
const { resetUsers } = require('./services/users.service');

const cors = require('cors');
const express = require('express');

function createServer() {
  resetExpenses();
  resetUsers();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
