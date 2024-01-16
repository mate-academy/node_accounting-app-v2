'use strict';

const express = require('express');

const { clearUsers } = require('./services/userServises');
const { clearExpenses } = require('./services/expensesServices');
const { router: usersRouter } = require('./routers/userRoutes');
const { router: expensesRouter } = require('./routers/expenseRoutes');

function createServer() {
  const app = express();

  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
