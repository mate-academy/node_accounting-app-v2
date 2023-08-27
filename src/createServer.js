'use strict';

const express = require('express');
const expensesRoutes = require('./routes/expenses.js');
const usersRoutes = require('./routes/users.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/expenses', expensesRoutes);
  app.use('/users', usersRoutes);

  return app;
}

module.exports = {
  createServer,
};
