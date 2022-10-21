'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses.js');
const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');

function createServer() {
  const app = express();

  userService.deleteAll();
  expenseService.deleteAll();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
