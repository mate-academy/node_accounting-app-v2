'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter');
const { resetExpenses } = require('./services/expensesService');
const { resetUsers } = require('./services/usersService');

function createServer() {
  const server = express();

  resetExpenses();
  resetUsers();

  server.use(cors());

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
