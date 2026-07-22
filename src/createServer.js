const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const { users } = require('./services/users.service');
const { expenses } = require('./services/expenses.service');

function createServer() {
  const app = express();

  users.length = 0;
  expenses.length = 0;

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  return app;
}

module.exports = {
  createServer,
};
