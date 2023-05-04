'use strict';

const express = require('express');
const cors = require('cors');
const { router } = require('./routes/users');
const { routerExpenses } = require('./routes/expenses');

const app = express();

app.use(cors());

function createServer() {
  app.use('/users', express.json(), router);
  app.use('/expenses', express.json(), routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
