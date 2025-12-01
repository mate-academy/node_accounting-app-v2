'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./api/routers/users.router');
const { expensesRouter } = require('./api/routers/expenses.routers');
const { cleanUsersData } = require('./api/services/users.services');
const { cleanExpensesData } = require('./api/services/expenses.services');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  cleanUsersData();
  cleanExpensesData();
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
