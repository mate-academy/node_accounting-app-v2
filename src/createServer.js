'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRoutes');
const { expensesRouter } = require('./routes/expensesRoutes');
const { resetExpenses } = require('./controllers/expensesController');
const { resetUsers } = require('./controllers/usersController');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  resetUsers();
  resetExpenses();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
