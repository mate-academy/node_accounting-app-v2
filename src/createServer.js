'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/users.router.js');
const { expensesRouter } = require('./routers/expenses.router.js');
const usersService = require('./services/users.service.js');
const expensesService = require('./services/expenses.service.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  usersService.reset();
  expensesService.reset();

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
