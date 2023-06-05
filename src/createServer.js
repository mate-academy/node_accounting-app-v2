'use strict';

const express = require('express');
const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};

// Use express to create a server
// Add a routes to the server
// Return the server (express app)

// MVC (model view controller)
