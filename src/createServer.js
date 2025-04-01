'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router.js');
const userService = require('./services/user.service.js');
const expensesRouter = require('./routes/expenses.router.js');
const expenseService = require('./services/expense.service.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  userService.resetUsers();
  expenseService.resetExpenses();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = { createServer };
