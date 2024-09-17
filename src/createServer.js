'use strict';

const express = require('express');

const usersSevice = require('./services/users.service');
const expensesSevice = require('./services/expenses.service');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

function createServer() {
  // this is for the tests to work properly
  usersSevice.clear();
  expensesSevice.clear();

  const server = express();

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  server.all('*', (_, res) => {
    res.sendStatus(404);
  });

  return server;
}

module.exports = {
  createServer,
};
