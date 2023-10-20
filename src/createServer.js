'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');

const expensesService = require('./services/expenses.service');
const usersService = require('./services/user.service');

function createServer() {
  const app = express();

  app.use(cors());

  usersService.clear();
  expensesService.clear();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
