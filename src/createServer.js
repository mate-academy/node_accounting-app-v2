'use strict';

const express = require('express');
const createExpensesRouter = require('./routes/expenses');
const createUsersRouter = require('./routes/users');

function createServer() {
  const app = express();

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  app.use(express.json());

  const expenses = [];
  const users = [];

  app.use('/expenses', createExpensesRouter(expenses, users));
  app.use('/users', createUsersRouter(users));

  return app;
}

module.exports = {
  createServer,
};
