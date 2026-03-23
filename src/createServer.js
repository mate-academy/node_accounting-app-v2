'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.route.js');
const expensesRouter = require('./routes/expenses.route.js');
const usersService = require('./services/users.service.js');
const expensesService = require('./services/expenses.service.js');

function createServer() {
  usersService.clear();
  expensesService.clear();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
