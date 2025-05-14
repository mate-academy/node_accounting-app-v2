'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./route/expenses.route');
const usersRouter = require('./route/user.route');
const expensesService = require('./service/expenses.service');
const usersService = require('./service/user.service');

function createServer() {
  const app = express();

  expensesService.resetExpenses();
  usersService.resetUsers();
  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
