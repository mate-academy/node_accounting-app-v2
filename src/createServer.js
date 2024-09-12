'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user_router.js');
const { expenseRouter } = require('./routes/expense_router.js');
const { userService } = require('./services/user_service.js');
const { expenseService } = require('./services/expense_service.js');

function createServer() {
  userService.getInitial();
  expenseService.getInitial();

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
