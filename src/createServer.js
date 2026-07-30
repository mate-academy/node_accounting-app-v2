'use strict';

const express = require('express');
const cors = require('cors');
const routes = require('./api/routes.js');

// It isneeded for tests to reset data before each test
const usersService = require('./api/users/users.service.js');
const expensesService = require('./api/expenses/expenses.service.js');

const createServer = function () {
  // It is needed for tests to reset data before each test
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());

  // routes
  for (const routeKey in routes) {
    app.use(`/${routeKey}`, routes[routeKey]);
  }

  return app;
};

module.exports = { createServer };
