'use strict';

const express = require('express');
const usersRouter = require('./users/users.router');
const expensesRouter = require('./expenses/expenses.router');
const usersService = require('./users/users.service');
const expensesService = require('./expenses/expenses.service');

function createServer() {
  const server = express();

  usersService.clearUsers();
  expensesService.clearExpenses();

  server.use(express.json());
  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
