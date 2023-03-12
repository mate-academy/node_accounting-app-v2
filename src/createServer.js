'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const { clearUsersData } = require('./services/users');
const { clearExpensesData } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  clearUsersData();

  app.use('/expenses', express.json(), expensesRouter);
  clearExpensesData();

  return app;
}

module.exports = {
  createServer,
};
