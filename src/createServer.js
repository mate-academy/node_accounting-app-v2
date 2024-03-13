'use strict';

const express = require('express');
const { usersRouter } = require('./Routers/UsersRouter');
const { expensesRouter } = require('./Routers/ExpensesRouter');
const { myStore } = require('./Data/Store');

function createServer() {
  myStore.clearUsers();
  myStore.clearExpenses();

  const server = express();

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
