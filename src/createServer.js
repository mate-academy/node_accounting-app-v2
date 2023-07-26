'use strict';

const express = require('express');
const { router: usersRouter, setInitialUsers } = require('./routers/users');
const {
  router: expensesRouter,
  setInitialExpenses,
} = require('./routers/expenses');

function createServer() {
  const app = express();

  setInitialExpenses();
  setInitialUsers();

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
