'use strict';

const express = require('express');
const { usersRouter } = require('./Routers/UsersRouter');
const { expensesRouter } = require('./Routers/ExpensesRouter');
const { clearUsers } = require('./Services/User.services');
const { clearExpenses } = require('./Services/Expenses.services');

function createServer() {
  clearUsers();
  clearExpenses();

  const server = express();

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
