'use strict';

const express = require('express');
const cors = require('cors');

const usersRoute = require('./routes/usersRoute');
const expensesRoute = require('./routes/expensesRoute');

const { usersService } = require('./services/users');
const { expensesService } = require('./services/expenses');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(usersRoute);
  app.use(expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
