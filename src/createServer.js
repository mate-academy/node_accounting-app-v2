'use strict';

const express = require('express');
const expensesRouter = require('./routers/ExpensesRouter');
const usersRouter = require('./routers/UsersRouter');
const expensesService = require('./controllers/expenses');
const usersService = require('./controllers/users');

function createServer() {
  const app = express();

  expensesService.clearExpenses();
  usersService.clearUsers();

  app.use(express.json());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
