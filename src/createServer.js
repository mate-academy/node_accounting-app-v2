'use strict';

const userServicesApp = require('./services/users.service.js');
const { usersRouterApp } = require('./routes/users.routes.js');

const expensesServicesApp = require('./services/expenses.service.js');
const { expensesRouterApp } = require('./routes/expenses.routes.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  userServicesApp.init();
  expensesServicesApp.init();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouterApp);
  app.use('/expenses', expensesRouterApp);

  return app;
}

module.exports = {
  createServer,
};
