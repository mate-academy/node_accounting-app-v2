'use strict';

const express = require('express');
const { userRouter, expenseRouter } = require('./routes');
const { userService, expenseService } = require('./service');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  userService.clear();
  expenseService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
