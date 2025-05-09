'use strict';

const express = require('express');
const cors = require('cors');
const expensesModel = require('./services/Expense.service.js');
const usersModel = require('./services/User.service.js');
const usersRouter = require('./routes/User.routes.js');
const expensesRouter = require('./routes/Expense.routes.js');

function createServer() {
  if (process.env.NODE_ENV === 'test') {
    usersModel.resetUsers();
    expensesModel.resetExpenses();
  }

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
