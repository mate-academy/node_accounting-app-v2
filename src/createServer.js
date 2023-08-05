'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.init();
  expensesService.init();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
