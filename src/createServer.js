'use strict';

const express = require('express');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const { users } = require('./controllers/userController');
const { expenses } = require('./controllers/expenseController');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/expenses', expenseRoutes);
  app.use('/users', userRoutes);

  users.length = 0;
  expenses.length = 0;

  return app;
}

module.exports = {
  createServer,
};
