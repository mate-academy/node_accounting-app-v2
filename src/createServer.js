'use strict';

const express = require('express');
const { usersRoutes } = require('./routes/usersRoutes');
const { expensesRoutes } = require('./routes/expensesRoutes');
const { resetExpenses } = require('./services/expensesServices');
const { resetUsers } = require('./services/usersServices');

function createServer() {
  const app = express();

  resetExpenses();
  resetUsers();

  app.use('/users', express.json(), usersRoutes);
  app.use('/expenses', express.json(), expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
