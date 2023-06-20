'use strict';

const express = require('express');
const { checkBodyParams } = require('./middleware/checkBodyParams');
const { checkId } = require('./middleware/checkId');

const userController = require('./controllers/user');
const expensesController = require('./controllers/expenses');

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];

  app.use(express.json());

  app.get('/users', userController.getAll(users));

  app.post('/users', checkBodyParams('name', 400), userController.add(users));

  app.get('/users/:id',
    checkId(),
    userController.getOne(users));

  app.patch('/users/:id',
    checkId(),
    checkBodyParams('name', 400),
    userController.update(users));

  app.delete('/users/:id',
    checkId(),
    userController.remove(users));

  app.get('/expenses', expensesController.getAll(expenses));

  app.post('/expenses', expensesController.add(expenses, users));

  app.get('/expenses/:id',
    checkId(),
    expensesController.getOne(expenses));

  app.delete('/expenses/:id',
    checkId(),
    expensesController.remove(expenses));

  app.patch('/expenses/:id',
    checkId(),
    expensesController.update(expenses));

  return app;
}

module.exports = {
  createServer,
};
