'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { clearAll: clearExpenses } = require('./services/expenses');
const { clearAll: clearUsers } = require('./services/users');
const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  clearExpenses();
  clearUsers();

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
