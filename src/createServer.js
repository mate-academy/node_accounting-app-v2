/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

const userService = require('./services/users');
const expensesService = require('./services/expenses');

const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');

function createServer() {
  userService.setInitialValue([]);
  expensesService.setInitialValue([]);

  const server = express();

  server.use(cors());
  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

createServer().listen(3000, () => {
  console.log(`server was running on http://localhost:3000`);
});

module.exports = {
  createServer,
};
