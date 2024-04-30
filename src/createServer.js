'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.router');
const expensesRouter = require('./routes/expenses.router');
const userService = require('./services/user.service.js');
const expensesService = require('./services/expenses.service.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());
  userService.start();
  expensesService.start();

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
