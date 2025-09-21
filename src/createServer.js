'use strict';

const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const expensesRoutes = require('./routes/expensesRoutes');

const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
