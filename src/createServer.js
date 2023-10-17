'use strict';

const express = require('express');
const usersServise = require('./servises/users.service');
const userRouter = require('./router/users.route');
const expensesRouter = require('./router/expenses.route');
const expensesService = require('./servises/expenses.service');

function createServer() {
  const app = express();

  usersServise.clear();
  expensesService.clear();

  app.use('/users', express.json(), userRouter.router);
  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
