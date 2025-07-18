'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./api/expenses.router');
const usersRouter = require('./api/users.router');
const expensesService = require('./services/expenses.service');
const usersService = require('./services/users.service');

function createServer() {
  const server = express();

  expensesService.resetExpenses();
  usersService.resetUsers();

  server.use(cors());
  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
