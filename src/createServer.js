'use strict';

// const express = require('express');
const express = require('express');
const cors = require('cors');

const usersServices = require('./services/users');
const expensesServices = require('./services/expenses');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());

  usersServices.setInitial();
  expensesServices.setInitial();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
