'use strict';

const express = require('express');
const cors = require('cors');
const expensesRoutes = require('./routes/expenses');
const usersRoutes = require('./routes/users');
const { clearAll: clearExpenses } = require('./services/expenses');
const { clearAll: clearUsers } = require('./services/users');

function createServer() {
  const app = express();

  app.use(cors());
  clearExpenses();
  clearUsers();
  app.use('/users', express.json(), usersRoutes);
  app.use('/expenses', express.json(), expensesRoutes);

  return app;
};

module.exports = {
  createServer,
};
