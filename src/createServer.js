'use strict';

const express = require('express');
const usersRouter = require('./users/users.router.js');
const expensesRouter = require('./expenses/expenses.router.js');
const { resetUsers } = require('./users/users.service.js');
const { resetExpenses } = require('./expenses/expenses.service.js');

function createServer() {
  // Use express to create a server
  resetExpenses();
  resetUsers();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
