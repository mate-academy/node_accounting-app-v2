'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const createServer = (initialUsers = [], initialExpenses = []) => {
  const users = [...initialUsers];
  const expenses = [...initialExpenses];
  const userId = 0;
  const expenseId = 0;

  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes(users, userId));
  app.use('/expenses', expenseRoutes(expenses, expenseId, users));

  return app;
};

module.exports = {
  createServer,
};
