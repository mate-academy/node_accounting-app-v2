'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expensesRoutes');
const { usersRouter } = require('./routes/usersRoutes');
const expenseService = require('./services/expenseService');
const userService = require('./services/userService');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  expenseService.clearExpenses();
  userService.clearUsers();

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
