'use strict';

const express = require('express');
const cors = require('cors');
const { clear: clearUsers } = require('./services/users.service');
const { clear: clearExpenses } = require('./services/expenses.service');
const { router: expensesRouter } = require('./routes/expenses.route');
const { router: usersRouter } = require('./routes/users.route');

const server = express();

function createServer() {
  clearUsers();
  clearExpenses();

  server.use(cors(), express.json());

  server.use('/expenses', expensesRouter);
  server.use('/users', usersRouter);

  return server;
}

module.exports = {
  createServer,
};
