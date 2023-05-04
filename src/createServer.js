'use strict';

const express = require('express');
const cors = require('cors');

const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');
const usersRouter = require('./routes/usersRoutes');
const expensesRouter = require('./routes/expensesRouter');

function createServer() {
  const app = express();

  usersService.resetUsers();
  expensesService.resetExpenses();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
