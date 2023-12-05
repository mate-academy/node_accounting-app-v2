'use strict';

const express = require('express');
const cors = require('cors');
const {
  clearUsersBeforeStart,
} = require('./services/userService.js');
const {
  clearExpensesBeforeStart,
} = require('./services/expenseService.js');
const { router: userRouter } = require('./routes/userRoute.js');
const { router: expensesRouter } = require('./routes/expenseRouter.js');

function createServer() {
  const server = express();

  clearUsersBeforeStart();
  clearExpensesBeforeStart();

  server.use(cors());
  server.use('/users', userRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
