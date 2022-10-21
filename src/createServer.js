'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const expensesRoutes = require('./routes/expenses.js');
const userService = require('./controllers/userService.js');
const expensesService = require('./controllers/expensesService.js');

function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', bodyParser.json(), userRoutes);
  userService.init();

  app.use('/', bodyParser.json(), expensesRoutes);
  expensesService.init();

  return app;
}

module.exports = { createServer };
