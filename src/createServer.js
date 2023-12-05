'use strict';

const express = require('express');
const userRouter = require('./routes/userRoute').router;
const expenseRouter = require('./routes/expenseRoute').router;
const cors = require('cors');
const clearUsers = require('./services/users.service').clearUsers;
const clearExpenses = require('./services/expenses.service').clearExpenses;
// const expenseService = require('./services/expenses.service');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  clearUsers();
  clearExpenses();

  app.use(cors());
  app.use('/expenses', express.json(), expenseRouter);
  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
