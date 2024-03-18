'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { expensesRouter } = require('./routes/expenses.route');
const { init: userInit } = require('./services/user.service');
const { init: expensesInit } = require('./services/expenses.service');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  userInit();
  expensesInit();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
