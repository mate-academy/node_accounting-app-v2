'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./api/users.router');
const { expensesRouter } = require('./api/expenses.router');
const { services: userServices } = require('./api/users.service');
const { services: expensesServices } = require('./api/expenses.service');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  userServices.reset();
  expensesServices.reset();

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
