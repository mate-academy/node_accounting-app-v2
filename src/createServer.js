'use strict';

const express = require('express');
const cors = require('cors');

const expensesService = require('./services/expenses.js');
const userService = require('./services/users.js');
const { expensesRouter } = require('./routers/expenses.js');
const { usersRouter } = require('./routers/users.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  expensesService.removeAll();
  userService.removeAll();

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
