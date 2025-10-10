'use strict';

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.route');
const expenseRoutes = require('./routes/expenses.route');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expenses.service');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/', userRoutes);
  app.use('/', expenseRoutes);

  return app;
}

module.exports = {
  createServer,
};
