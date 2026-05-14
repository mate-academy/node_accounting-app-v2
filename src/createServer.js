'use strict';

const express = require('express');
const usersService = require('./services/usersSvc');
const expensesService = require('./services/expensesSvc');
const usersRouter = require('./routes/usersRt');
const expensesRouter = require('./routes/expensesRt');

function createServer() {
  usersService.clear();
  expensesService.clear();

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
