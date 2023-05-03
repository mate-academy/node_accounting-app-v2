'use strict';

const express = require('express');

function createServer() {
  const cors = require('cors');
  const { router: usersRouter } = require('./routes/users.js');
  const { router: expensesRouter } = require('./routes/expenses.js');
  const { ExpensesModel } = require('./models/expenses.js');
  const { UsersModel } = require('./models/users.js');

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  ExpensesModel.reset();
  UsersModel.reset();

  return app;
}

module.exports.createServer = createServer;
