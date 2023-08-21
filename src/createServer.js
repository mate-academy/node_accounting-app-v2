'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');
const { clearUsers } = require('./services/users.js');
const { clearExpenses } = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
