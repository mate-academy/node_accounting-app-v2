'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/user.route');
const expensesRouter = require('./routes/expenses.route');
const usersService = require('./services/user.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.clear();
  expensesService.clear();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
