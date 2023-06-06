'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const { clearUsers } = require('./services/users');
const { clearExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  clearUsers();
  clearExpenses();

  return app;
}

module.exports = {
  createServer,
};
