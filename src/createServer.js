'use strict';

const express = require('express');
const cors = require('cors');
const { clearUsers } = require('./services/users.service.js');
const { clearExpenses } = require('./services/expenses.service.js');
const { expensesRouter } = require('./api/expenses.router.js');
const { usersRouter } = require('./api/users.router.js');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
