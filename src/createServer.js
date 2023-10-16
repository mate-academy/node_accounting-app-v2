'use strict';

const express = require('express');
const { router: expensesRouter } = require('./routes/expenses.router');
const { router: usersRouter } = require('./routes/users.router');

function createServer() {
  const server = express();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
