'use strict';

const express = require('express');
const routes = require('../routes/routes');
const { resetUsers } = require('../services/userService');
const { resetExpenses } = require('../services/expenseService');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use(express.json());
  app.use(routes);

  return app;
}

module.exports = {
  createServer,
};
