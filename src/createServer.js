'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/users.service');
const expensesService = require('./services/expenses.service');
const usersRouter = require('./routes/users.route').router;
const expensesRouter = require('./routes/expenses.route').router;

function createServer() {
  const server = express();

  server.use(cors());
  userService.start();
  expensesService.start();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), express.query(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
