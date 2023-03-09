'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');
const { userService } = require('./services/users.js');
const { expenseService } = require('./services/expenses.js');

function createServer() {
  userService.getEmptyUsers();
  expenseService.getEmptyExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
