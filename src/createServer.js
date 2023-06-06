const express = require('express');
const cors = require('cors');
const userService = require('./service/users');
const expensesService = require('./service/expenses');
const { router: userRouter } = require('./routes/userRoute');
const { router: expensesRouter } = require('./routes/expensesRoute');

function createServer() {
  userService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
