'use strict';

const express = require('express');
const cors = require('cors');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  usersService.getInitial();
  expensesService.getInitial();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
