/* eslint-disable max-len */
'use strict';

const express = require('express');
const { getAll, getOne, create, remove, update } = require('./controllers/users.js');
const { clearUsers } = require('./services/users.service');
const { clearExpenses } = require('./services/expenses.service');

const {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  patchExpense,
} = require('./controllers/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  clearUsers();
  clearExpenses();

  app.get('/users', getAll);
  app.get('/users/:id', getOne);
  app.post('/users', express.json(), create);
  app.delete('/users/:id', remove);
  app.patch('/users/:id', express.json(), update);

  app.get('/expenses', getAllExpenses);
  app.get('/expenses/:id', getOneExpense);
  app.post('/expenses', express.json(), addExpense);
  app.delete('/expenses/:id', removeExpense);
  app.patch('/expenses/:id', express.json(), patchExpense);

  return app;
}

module.exports = {
  createServer,
};
