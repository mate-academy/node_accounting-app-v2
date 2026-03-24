'use strict';

const express = require('express');
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  getExpenses,
  getSingleExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  resetData,
} = require('./controller/controller.js');

function createServer() {
  resetData();

  const app = express();

  app.use(express.json());

  app.get('/users', getUsers);

  app.get('/users/:id', getSingleUser);

  app.post('/users', createUser);

  app.delete('/users/:id', deleteUser);

  app.patch('/users/:id', updateUser);

  app.get('/expenses', getExpenses);

  app.get('/expenses/:id', getSingleExpense);

  app.post('/expenses', createExpense);

  app.delete('/expenses/:id', deleteExpense);

  app.patch('/expenses/:id', updateExpense);

  return app;
}

module.exports = {
  createServer,
};
