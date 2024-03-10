'use strict';

const express = require('express');
const cors = require('cors');
const expenseService = require('./services/expense.service');
const userService = require('./services/user.service');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  expenseService.init();
  userService.init();

  const app = express();

  app.use(cors);
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
