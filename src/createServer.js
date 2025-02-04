'use strict';

const express = require('express');
const cors = require('cors');

const expensesService = require('./services/expenses.service.js');
const usersService = require('./services/users.service.js');

const { router: expenseRouter } = require('./routes/expense.route.js');
const { router: usersRouter } = require('./routes/user.route.js');

function createServer() {
  const app = express();

  usersService.resetUsers();
  expensesService.resetExpenses();

  app.use(cors());
  app.use(express.json());
  app.use('/expenses', expenseRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
