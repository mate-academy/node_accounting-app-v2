'use strict';

const express = require('express');

const userRouter = require('./routers/users');
const expensesRouter = require('./routers/expenses');

const usersServices = require('./services/users');
const expensesServices = require('./services/expenses');

function createServer() {
  const server = express();

  usersServices.setInitialUsers();
  expensesServices.setInitialExpenses();

  server.use('/users', userRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
