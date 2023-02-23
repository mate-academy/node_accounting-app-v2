'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const expensesService = require('./services/expenses');
const usersService = require('./services//users');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  usersService.reset();

  app.use('/expenses', express.json(), expensesRouter);
  expensesService.reset();

  return app;
}

module.exports = {
  createServer,
};
