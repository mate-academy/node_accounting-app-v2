'use strict';

const express = require('express');
const { userRouter } = require('./routes/userRoute');
const { expensesRoute } = require('./routes/expensesRoute');
const { resetUsers } = require('./controllers/userController');
const { resetExpenses } = require('./controllers/expensesController');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRoute);

  return app;
}

module.exports = {
  createServer,
};
