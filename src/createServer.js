'use strict';

const express = require('express');
const cors = require('cors');
const userServices = require('./services/users');
const expenceServices = require('./services/expenses');
const usersRouter = require('./routes/usersRoutes');
const expencesRouter = require('./routes/expensesRoutes');

function createServer() {
  const server = express();

  server.use(cors());
  server.use(express.json());

  userServices.reset();
  expenceServices.reset();

  server.use('/users', usersRouter);
  server.use('/expenses', expencesRouter);

  return server;
};

module.exports = {
  createServer,
};
