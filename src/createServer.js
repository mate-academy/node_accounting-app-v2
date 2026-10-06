'use strict';

const express = require('express');
const cors = require('cors');
const { createExpensesRouter } = require('./routers/expreseRouter');
const { createUserRouter } = require('./routers/userRouter');
const { resetUser } = require('./services/user.service');
const { resetExpenses } = require('./services/expense.service');

function createServer() {
  const app = express();

  resetUser();
  resetExpenses();

  app.use(express.json());
  app.use(cors());
  app.use('/expenses', createExpensesRouter());
  app.use('/users', createUserRouter());

  return app;
}

// Use express to create a server
// Add a routes to the server
// Return the server (express app)

module.exports = {
  createServer,
};
