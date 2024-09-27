'use strict';

// it works, but i still want to cry ;(, also Dmytro Hrytsak say hello to you

const express = require('express');
const { userRouter } = require('./routes/userRouter');
const { expenseRouter } = require('./routes/expenseRouter');
const { resetUsers } = require('./services/userServices');
const { resetExpenses } = require('./services/expenseServices');

const createServer = () => {
  const server = express();

  server.use(express.json());
  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);

  resetUsers();
  resetExpenses();

  return server;
};

module.exports = {
  createServer,
};
