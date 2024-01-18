'use strict';

const express = require('express');
const { clearUsers } = require('./services/user.service');
const userRoute = require('./routes/user.route');
const expRoute = require('./routes/expenses.route');
const { clearExp } = require('./services/expenses.serice');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/users', userRoute);
  app.use('/expenses', expRoute);

  clearUsers();
  clearExp();

  return app;
}

module.exports = {
  createServer,
};
