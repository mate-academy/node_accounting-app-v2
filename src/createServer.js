'use strict';

const { expenseController } = { ...require('./controllers/expenses') };
const { userController } = { ...require('./controllers/users.js') };
const { usersRouter } = { ...require('./routes/users.js') };
const { expensesRouter } = { ...require('./routes/expenses.js') };
const cors = require('cors');
const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(usersRouter);
  app.use(expensesRouter);

  userController.reset();
  expenseController.reset();

  return app;
}

module.exports = {
  createServer,
};
