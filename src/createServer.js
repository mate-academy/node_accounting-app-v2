'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const usersService = require('./services/users');
const expensesRouter = require('./routes/expenses');
const expensesService = require('./services/expenses');
const { errorMiddleware } = require('./middleware/errorMiddleware');

function createServer() {
  const app = express();

  usersService.initiate([]);
  expensesService.initiate([]);

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use(errorMiddleware);

  return app;
}

module.exports = {
  createServer,
};
