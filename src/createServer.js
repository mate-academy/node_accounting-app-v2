'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());
  app.locals.users = [];
  app.locals.expenses = [];
  app.locals.userIdCounter = 1;
  app.locals.expenseIdCounter = 1;

  const usersRoutes = require('./users/usersRoutes');
  const expensesRoutes = require('./expenses/expensesRoutes');

  app.use('/users', (req, res, next) => {
    req.users = app.locals.users;
    req.userIdCounter = app.locals.userIdCounter;
    next();
  });

  app.use('/expenses', (req, res, next) => {
    req.expenses = app.locals.expenses;
    req.expenseIdCounter = app.locals.expenseIdCounter;
    req.users = app.locals.users;
    next();
  });

  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  return app;
}

module.exports = { createServer };
