'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routers/expenses.router.js');
const { usersRouter } = require('./routers/users.router.js');
const { initExpenses } = require('./services/expenses.service.js');
const { initUsers } = require('./services/users.service.js');

function createServer() {
  const app = express();

  initExpenses();
  initUsers();

  app.use(cors());
  app.use('/expenses', express.json(), expensesRouter);
  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = {
  createServer,
};
