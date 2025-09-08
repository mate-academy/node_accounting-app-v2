'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./api/users.router.js');
const expensesRouter = require('./api/expenses.router.js');
const usersService = require('./services/users.service.js');
const expensesService = require('./services/expenses.service.js');

function createServer() {
  const app = express();

  usersService.reset();
  expensesService.reset();

  app.use(express.json());
  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
