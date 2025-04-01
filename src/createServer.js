'use strict';

const express = require('express');
const cors = require('cors');
const { userService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');
const { usersRouter } = require('./router/usersRouter');
const { expensesRouter } = require('./router/expensesRouter');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  userService.clear();
  expensesService.clear();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
