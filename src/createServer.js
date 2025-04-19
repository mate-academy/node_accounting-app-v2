'use strict';

const express = require('express');
const cors = require('cors');
const { resetUsers } = require('./services/users.service.js');
const { resetExpenses } = require('./services/expenses.service.js');
const { usersRouter } = require('./routes/users.router.js');
const { expensesRouter } = require('./routes/expenses.router.js');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
