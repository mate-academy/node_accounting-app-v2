'use strict';

// createServer.js
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', controllers.getUsers);
  app.get('/users/:userId', controllers.getUserById);
  app.post('/users', controllers.createUser);

  app.get('/expenses', controllers.getExpenses);
  app.get('/expenses/:expenseId', controllers.getExpenseById);
  app.post('/expenses', controllers.createExpense);

  return app;
}

module.exports = { createServer };
