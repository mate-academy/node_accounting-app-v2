'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const server = express();

  server.use(cors());
  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
