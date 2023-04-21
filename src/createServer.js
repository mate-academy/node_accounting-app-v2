'use strict';

const express = require('express');
const { expenseRouter } = require('./routes/expense.js');
const { userRouter } = require('./routes/user.js');
const { resetExpenses } = require('./services/expense');
const { resetUsers } = require('./services/user');

function createServer() {
  const server = express();

  resetExpenses();
  resetUsers();

  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expenseRouter);

  return server;
}

module.exports = {
  createServer,
};
