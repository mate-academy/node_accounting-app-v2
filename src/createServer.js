'use strict';

const express = require('express');

const userRoutes = require('./routes/users.router.js');
const expensesRoutes = require('./routes/expenses.router.js');
const { resetExpenses } = require('./services/expenses.service.js');
const { resetUsers } = require('./services/users.service.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  resetUsers();
  resetExpenses();

  const app = express();

  app.use('/users', userRoutes);
  app.use('/expenses', expensesRoutes);

  app.use((req, res, next) => {
    res.status(404).send('Route not found');
  });

  return app;
}

module.exports = {
  createServer,
};
