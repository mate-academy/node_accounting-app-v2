'use strict';

const express = require('express');
const cors = require('cors');
const { usersRoute } = require('./routes/users');
const { expensesRoute } = require('./routes/expenses');
const { usersService } = require('./services/users');
const { expensesService } = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRoute);
  app.use('/expenses', express.json(), expensesRoute);
  usersService.init();
  expensesService.init();

  return app;
}

module.exports = {
  createServer,
};
