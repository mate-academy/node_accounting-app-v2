'use strict';

const express = require('express');
const cors = require('cors');
const { initiateUsers } = require('./services/user.service');
const { initiateExpenses } = require('./services/expense.service');
const { userRouter } = require('./routes/user.route');
const { expenseRoute } = require('./routes/expense.route');

function createServer() {
  const app = express();
  initiateUsers();
  initiateExpenses();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Node js accounting!');
  });

  app.use('/users', userRouter)
  app.use('/expenses', expenseRoute)

  return app;
}

module.exports = {
  createServer,
};
