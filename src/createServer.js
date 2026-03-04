'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./api/users.router');
const { expensesRouter } = require('./api/expenses.router');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  if (typeof usersService.clear === 'function') {
    usersService.clear();
  }

  if (typeof expensesService.clear === 'function') {
    expensesService.clear();
  }

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
