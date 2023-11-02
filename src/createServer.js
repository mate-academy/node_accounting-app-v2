'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  // app.use('./expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
