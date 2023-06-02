'use strict';

const express = require('express');
const cors = require('cors');

const { userModel } = require('./controllers/users.js');
const { expensesModel } = require('./controllers/expenses.js');

const usersRouter = require('./routes/users.js').router;
const expensesRouter = require('./routes/expenses.js').router;

function createServer() {
  userModel.resetUsers();
  expensesModel.resetExpenses();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
