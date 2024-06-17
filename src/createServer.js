'use strict';

const express = require('express');
const { deleteExpenses } = require('./services/expenses.service');
const { deleteAllUsers } = require('./services/users.service');
const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  deleteAllUsers();
  deleteExpenses();

  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
