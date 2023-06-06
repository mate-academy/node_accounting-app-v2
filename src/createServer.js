'use strict';

const express = require('express');
const cors = require('cors');
const userControllers = require('./controllers/users');
const expenseControllers = require('./controllers/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', userControllers.getUsers);
  app.get('/users/:userId', userControllers.getUserById);
  app.post('/users', userControllers.createUser);

  app.get('/expenses', expenseControllers.getExpenses);
  app.get('/expenses/:expenseId', expenseControllers.getExpenseById);
  app.post('/expenses', expenseControllers.createExpense);

  return app;
}

module.exports = { createServer };
