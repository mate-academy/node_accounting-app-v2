'use strict';

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRouter.js');
const { initUsers } = require('./services/users.js');

const expensesRoutes = require('./routes/expensesRouter.js');
const { initExpenses } = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRoutes);
  initUsers();

  app.use('/expenses', express.json(), expensesRoutes);
  initExpenses();

  return app;
}

module.exports = {
  createServer,
};
