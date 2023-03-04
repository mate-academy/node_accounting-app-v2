'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const usersService = require('./services/users');
const expensesRouter = require('./routes/expenses');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.initiate([]);
  expensesService.initiate([]);

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
