'use strict';

const express = require('express');
const usersRouter = require('./users/usersRouter');
const expensesRouter = require('./expenses/expensesRouter');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const server = express();

  server.use(express.json());

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
