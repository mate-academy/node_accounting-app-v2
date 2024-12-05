'use strict';

const express = require('express');
const cors = require('cors');
const { usersRoutes } = require('./routes/users.route.js');
const { expensesRoutes } = require('./routes/expenses.route.js');
const { resetUsers } = require('./services/user.services.js');
const { resetExpenses } = require('./services/expense.services.js');

function createServer() {
  const server = express();

  resetUsers();
  resetExpenses();

  server.use(cors());

  server.use(express.json());

  server.use('/users', usersRoutes);
  server.use('/expenses', expensesRoutes);

  return server;
}

module.exports = {
  createServer,
};
