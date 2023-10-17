'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(cors());

  userService.removeAll();
  expenseService.removeAll();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
