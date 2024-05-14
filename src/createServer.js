'use strict';

const userServicesApp = require('./services/users.service.js');
const usersRouterApp = require('./routes/users.routes.js');

const expensesServicesApp = require('./services/expenses.service.js');
const expensesRouterApp = require('./routes/expenses.routes.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const userService = userServicesApp.createService();
  const expensesService = expensesServicesApp.createService();

  const usersRouter = usersRouterApp.createRouter({ userService });
  const expensesRouter = expensesRouterApp.createRouter({
    userService,
    expensesService,
  });

  const app = express();
  // Add a routes to the server

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
