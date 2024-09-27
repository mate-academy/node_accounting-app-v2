'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user');
const { router: expenseRouter } = require('./routes/expense');

function createServer() {
  const server = express();

  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expenseRouter);

  return server;
}

createServer();

module.exports = {
  createServer,
};
