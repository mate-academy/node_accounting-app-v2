'use strict';

const express = require('express');
const { usersRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expense.route');
const { usersService } = require('./services/user.service');
const { expensesService } = require('./services/expense.service');

const createServer = () => {
  usersService.removeAll();
  expensesService.removeAll();

  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = { createServer };
