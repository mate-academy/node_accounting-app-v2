'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/users.js');
const { expenseRouret } = require('./routes/expenses.js');

const userService = require('./services/users.js');
const expenseService = require('./services/expenses.js');

function createServer() {
  const app = express();

  userService.reset();
  expenseService.reset();

  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouret);

  return app;
}

module.exports = {
  createServer,
};
