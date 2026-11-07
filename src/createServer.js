'use strict';

const express = require('express');
const { createUsersRouter } = require('./users.router');
const { createExpensesRouter } = require('./expenses.router');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  const data = {
    users: [],
    expenses: [],
    countUsers: 1,
    countExpenses: 1,
  };

  app.use('/users', createUsersRouter(data));

  app.use('/expenses', createExpensesRouter(data));

  return app;
}

module.exports = {
  createServer,
};
