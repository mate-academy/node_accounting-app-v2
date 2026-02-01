'use strict';

const express = require('express');
const createUserRouter = require('./entities/users/users.routes');
const expensesRouter = require('./entities/expenses/expenses.routes');
const UsersService = require('./entities/users/users.services');

function createServer() {
  const app = express();

  const userService = new UsersService();

  app.use('/', express.json());
  app.use('/users', createUserRouter(userService));
  app.use('/expenses', expensesRouter(userService));

  return app;
}

module.exports = {
  createServer,
};
