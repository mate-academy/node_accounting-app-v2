'use strict';

const express = require('express');
const { routerUsers } = require('./routes/usersRoute');
const { resetUsers } = require('./services/usersService');
const { routerExpenses } = require('./routes/expensesRoute');
const { resetExpenses } = require('./services/expensesServise');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), routerUsers);
  app.use('/expenses', express.json(), routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
