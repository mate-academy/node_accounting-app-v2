'use strict';

const express = require('express');
const { init: initExpenses } = require('./services/expense.service');
const { init: initUsers } = require('./services/user.service');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');

function createServer() {
  initExpenses();
  initUsers();

  const app = express();
  
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
