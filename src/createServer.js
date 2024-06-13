'use strict';

const express = require('express');
const { clearUsers } = require('./services/user.service');
const userRoute = require('./routes/user.route');
const expRoute = require('./routes/expenses.route');
const { clearExpenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRoute);
  app.use('/expenses', expRoute);

  clearUsers();
  clearExpenses();

  return app;
}

module.exports = {
  createServer,
};
