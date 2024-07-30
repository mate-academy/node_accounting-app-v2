'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.route.js');
// const { expensesRouter } = require('./routes/expenses.route.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  // app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
