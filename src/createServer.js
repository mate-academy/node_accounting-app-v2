'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const expensesRouter = require('./routes/expensesRouter');

const usersModel = require('./models/users');
const exprensesModel = require('./models/expenses');

function createServer() {
  const server = express();

  usersModel.reset();
  exprensesModel.reset();

  server.use(cors());
  server.use(express.json());
  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
