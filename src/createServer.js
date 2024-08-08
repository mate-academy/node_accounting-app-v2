'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.route.js');
const { expensesRouter } = require('./routes/expenses.route.js');
const { resetUsers } = require('./services/users.services.js');
const { resetExpenses } = require('./services/expenses.services.js');

function createServer() {
  const app = express();

  app.use(cors());

  resetUsers();
  resetExpenses();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
