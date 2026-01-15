'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');
const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
