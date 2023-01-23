'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routers/users');
const { expensesRouter } = require('./routers/expenses');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.init();
  expensesService.init();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
