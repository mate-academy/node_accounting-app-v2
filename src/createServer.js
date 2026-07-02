'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.routes');
const { expensesRoutes } = require('./routes/expenses.routes');

const { users } = require('./db/users');
const { expenses } = require('./db/expenses');

function createServer() {
  users.length = 0;
  expenses.length = 0;

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
