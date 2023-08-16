'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { UserModel } = require('./models/users.js');
const { ExpensesModel } = require('./models/expenses');
const { router: userRouter } = require('./routes/users.js');
const { router: expensesRouter } = require('./routes/expenses.js');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  UserModel.reset();
  ExpensesModel.reset();

  return app;
}

module.exports = {
  createServer,
};
