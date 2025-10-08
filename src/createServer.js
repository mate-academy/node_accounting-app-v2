'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../src/routers/usersRouter');
const { expensesRouter } = require('../src/routers/expensesRouter');
const userService = require('../src/services/userService');
const expensesService = require('../src/services/expensesSevice');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(express.json());
  app.use(cors());

  if (process.env.NODE_ENV === 'test') {
    userService.resetUsers?.();
    expensesService.resetExpenses?.();
  }

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
