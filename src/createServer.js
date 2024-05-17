'use strict';

const express = require('express');

const expensesRoutes = require('./routes/expenses-routes');
const usersRoutes = require('./routes/users-routes');

const { clearExpensesData } = require('./services/expenses-service');
const { clearUsersData } = require('./services/users-service');

function createServer() {
  const app = express();

  clearExpensesData();
  clearUsersData();

  app.use(usersRoutes);
  app.use(expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
