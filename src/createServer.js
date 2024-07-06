const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');
const { resetUsers } = require('./services/user.service');
const { resetExpenses } = require('./services/expense.service');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  resetUsers();
  resetExpenses();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
