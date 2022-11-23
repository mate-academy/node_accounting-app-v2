'use strict';

const express = require('express');
const { rounter: usersRounter } = require('./routes/users');
const { rounter: expensesRounter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRounter);
  app.use('/expenses', express.json(), expensesRounter);

  return app;
}

module.exports = {
  createServer,
};
