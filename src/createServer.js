'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const createServer = (initialUsers = [], initialExpenses = []) => {
  const users = [...initialUsers];
  const expenses = [...initialExpenses];

  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes(users));
  app.use('/expenses', expenseRoutes(expenses, users));

  return app;
};

module.exports = {
  createServer,
};
