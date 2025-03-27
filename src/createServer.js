'use strict';

const express = require('express');
const userRouter = require('./routes/user.route.js');
const userService = require('./services/user.service.js');
const expensesRouter = require('./routes/expenses.route.js');
const expensesService = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  userService.start();
  expensesService.start();
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
