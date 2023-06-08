'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');
const userController = require('./controllers/users.js');
const expensesController = require('./controllers/expenses.js');

function createServer() {
  usersService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(cors());

  app.get('/users', userController.getAll);

  app.get('/users/:id', userController.getOne);

  app.post('/users', express.json({ extended: true }), userController.add);

  app.delete('/users/:id', userController.remove);

  app.patch('/users/:id', express.json({ extended: true }),
    userController.update);

  app.get('/expenses', expensesController.getAll);

  app.post('/expenses', express.json({ extended: true }),
    expensesController.add);

  app.get('/expenses/:id', expensesController.getOne);

  app.delete('/expenses/:id', expensesController.remove);

  app.patch('/expenses/:id', express.json({ extended: true }),
    expensesController.update);

  return app;
}

module.exports = {
  createServer,
};
