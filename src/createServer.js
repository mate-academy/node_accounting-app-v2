'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses.js');
const { usersRouter } = require('./routes/users.js');
const expensesService = require('./services/expenses.js');
const userService = require('./services/users.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  expensesService.removeAll();
  userService.removeAll();

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  return app;
}

module.exports = {
  createServer,
};
