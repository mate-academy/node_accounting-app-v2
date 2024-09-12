'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./users/users.route');
const { setInitialUsers } = require('./users/users.service');
const { expensesRouter } = require('./expenses/expenses.route');
const { setInitialExpenses } = require('./expenses/expenses.service');

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
