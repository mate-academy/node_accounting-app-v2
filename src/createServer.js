'use strict';

const express = require('express');
const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const server = express();

  server.use('/users', express.json(), userRouter.router);
  server.use('/expenses', express.json(), expensesRouter.router);

  return server;
}

module.exports = {
  createServer,
};
