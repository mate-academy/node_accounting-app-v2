'use strict';

const { userRouter } = require('./routes/userRoutes.js');
const { expensesRouter } = require('./routes/expensesRouter.js');
const { clearUsers } = require('./services/userService.js');
const { clearExpenses } = require('./services/expensesService.js');

const express = require('express');
const app = express();

function createServer() {
  clearUsers();
  clearExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
