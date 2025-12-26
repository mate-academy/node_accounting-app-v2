'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/user.router.js');
const { expenseRouter } = require('./routers/expense.router.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
