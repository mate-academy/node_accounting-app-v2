'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const { usersInit } = require('./services/users.service');
const { expensesInit } = require('./services/expenses.service');
const expencesController = require('./controllers/expenses.controller');

function createServer() {
  const app = express();

  usersInit();
  expensesInit();

  app.use('/users', express.json(), usersRouter);

  app.get('/expenses', expencesController.getAllExpenses);

  app.get('/expenses/:id', expencesController.getExpenceById);

  app.post('/expenses', express.json(), expencesController.createNewExpense);

  app.delete('/expenses/:id', expencesController.removeExpence);

  app.put(
    '/expenses/:id',
    express.json(),
    expencesController.updateExpenceById,
  );

  return app;
}

module.exports = {
  createServer,
};
