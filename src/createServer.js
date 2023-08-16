'use strict';

const express = require('express');
const cors = require('cors');
const { UserModel } = require('./models/users.js');
const { ExpensesModel } = require('./models/expenses');
const { router: userRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  UserModel.reset();
  ExpensesModel.reset();

  return app;
}

module.exports = {
  createServer,
};
