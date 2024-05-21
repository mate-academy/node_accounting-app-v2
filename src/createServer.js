'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { expensesController } = require('./controllers/expenses.controller');
const { usersController } = require('./controllers/users.controller');

function createServer() {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.use('/users', usersController());
  server.use('/expenses', expensesController());

  return server;
}

module.exports = {
  createServer,
};
