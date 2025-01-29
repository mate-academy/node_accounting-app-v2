'use strict';

const express = require('express');
const { usersRouter } = require('./routers/users.router.js');
const { expensesRouter } = require('./routers/expenses.router.js');
const expensesService = require('./services/expenses.service.js');
const usersService = require('./services/users.service.js');

function createServer() {
  const server = express();

  usersService.start();
  expensesService.start();

  server.use(express.json());

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
