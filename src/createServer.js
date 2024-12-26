'use strict';

const express = require('express');
const cors = require('cors');
const { UserModel } = require('./models/users');
const { ExpenseModel } = require('./models/expenses');
const { router: usersRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  UserModel.reset();
  ExpenseModel.reset();

  return app;
}

module.exports = {
  createServer,
};
