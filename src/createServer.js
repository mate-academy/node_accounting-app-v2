'use strict';

const express = require('express');
const { userRoutes } = require('./routes/userRoutes');
const { expenseRoutes } = require('./routes/expenseRoutes');
const { resetUsers } = require('./services/userService');
const { reset } = require('./services/expenseService');

function createServer() {
  const server = express();

  server.use(express.json);
  server.use('./users', userRoutes);
  server.use('./expense', expenseRoutes);

  resetUsers();
  reset();

  return server;
}

module.exports = {
  createServer,
};
