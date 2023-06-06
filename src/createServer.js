'use strict';

const express = require('express');
const { userRouter } = require('./routes/userRouter');
const { expenseRouter } = require('./routes/expenseRouter');
const { resetUsers } = require('./services/userServices');
const { resetExpenses } = require('./services/expenseServices');

function createServer() {
  const server = express();

  server.use(express.json);
  server.use('/users', userRouter);
  server.use('/expense', expenseRouter);

  resetUsers();
  resetExpenses();

  return server;
}

module.exports = {
  createServer,
};
