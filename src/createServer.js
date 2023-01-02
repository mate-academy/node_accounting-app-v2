'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
