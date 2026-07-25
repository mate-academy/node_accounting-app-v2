'use strict';

const express = require('express');
const cors = require('cors');
const { createUsersController } = require('./controllers/usersController');
const {
  createExpensesController,
} = require('./controllers/expensesController');
const { createUsersRouter } = require('./routers/usersRouter');
const { createExpensesRouter } = require('./routers/expensesRouter');

function createServer() {
  const app = express();

  // fresh in-memory "database" every time createServer is called
  const store = {
    users: [],
    expenses: [],
    nextUserId: 1,
    nextExpenseId: 1,
  };

  app.use(cors());
  app.use(express.json());

  const usersController = createUsersController(store);
  const expensesController = createExpensesController(store);

  app.use('/users', createUsersRouter(usersController));
  app.use('/expenses', createExpensesRouter(expensesController));

  return app;
}

module.exports = {
  createServer,
};
