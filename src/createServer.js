'use strict';

const express = require('express');
const cors = require('cors');

const {
  getUsers,
  getUser,
  removeUser,
  createUser,
  changeUser,
} = require('./controllers/userControllers');

const {
  getExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  changeExpense,
} = require('./controllers/expencesControllers');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', getUsers);
  app.get('/users/:id', getUser);
  app.delete('/users/:id', removeUser);
  app.post('/users', createUser);
  app.put('/users/:id', changeUser);

  app.get('/expenses', getExpenses);
  app.get('/expenses/:id', getOneExpense);
  app.post('/expenses', addExpense);
  app.delete('/expenses/:id', removeExpense);
  app.put('/expenses/:id', changeExpense);

  return app;
}

module.exports = {
  createServer,
};
