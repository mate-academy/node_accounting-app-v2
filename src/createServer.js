'use strict';

const express = require('express');
const { clearAllUsers } = require('./services/user.service.js');
const { userRouter } = require('./routes/user.route.js');
const { clearAllExpenses } = require('./services/expense.service.js');
const { expenseRouter } = require('./routes/expense.route.js');

function createServer() {
  // Use express to create a server
  const app = express();

  clearAllUsers();
  clearAllExpenses();

  // Add a routes to the server
  app.use('/users', express.json(), userRouter);
  app.use('/users', express.json(), expenseRouter);

  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
