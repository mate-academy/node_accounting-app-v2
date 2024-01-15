'use strict';

const express = require('express');
const cors = require('cors');
const { setInitialUsers } = require('./services/users.service');
const { setInitialExpenses } = require('./services/expenses.service');
const { usersRouter } = require('./routes/users');
const { expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  setInitialUsers();
  setInitialExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
