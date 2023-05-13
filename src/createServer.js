'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');
const { initUsers } = require('./services/users');
const { initExpenses } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  initUsers();
  initExpenses();
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
