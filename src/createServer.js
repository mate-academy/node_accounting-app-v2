'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const { usersService } = require('./services/users');
const { expensesService } = require('./services/expenses');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(usersRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
