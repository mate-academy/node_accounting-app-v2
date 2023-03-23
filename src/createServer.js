'use strict';

const express = require('express');
const cors = require('cors');

const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');

const userRouter = require('./router/users.js').router;
const expenseRouter = require('./router/expenses.js').router;

function createServer() {
  const server = express();

  userService.setInitialValue();
  expenseService.setInitialValue();

  server.use(cors());

  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expenseRouter);

  return server;
};

module.exports = {
  createServer,
};
