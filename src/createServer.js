'use strict';

const express = require('express');
// const userController = require('./controllers/users');
// const expenseController = require('./controllers/expenses');

const { expensesRouter } = require('./routes/expenses');
const { usersRouter } = require('./routes/users');

const userService = require('./servises/users');
const expenseService = require('./servises/expenses');

function createServer() {
  const app = express();

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
