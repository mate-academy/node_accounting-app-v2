'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.route.js');
const { expenseRouter } = require('./routes/expense.route.js');
const { userService } = require('./services/user.service.js');
const { expenseService } = require('./services/expense.service.js');

function createServer() {
  userService.clearUsers();
  expenseService.clearExpenses();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
