'use strict';

const express = require('express');
const usersRouter = require('./api/routers/users.router');
const expensesRouter = require('./api/routers/expenses.router');
const { usersService } = require('./api/service/user.service');
const { expensesService } = require('./api/service/expenses.service');

function createServer() {
  usersService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(express.json());
  app.use(usersRouter);
  app.use(expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
