'use strict';

const express = require('express');
const usersRoutes = require('./routes/users.routes');
const expensesRoutes = require('./routes/expenses.routes');

function buildApp() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = { buildApp };
