'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/usersRouter');
const { expensesRouter } = require('./routers/expensesRouter');
const userService = require('./services/userService');
const expensesService = require('./services/expensesService');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  userService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
