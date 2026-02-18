'use strict';

const express = require('express');
const cors = require('cors');
const routers = require('./routers');
const services = require('./services');

function createServer() {
  services.userServices.resetUsers();
  services.expensesServices.resetExpenses();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', routers.userRouter);
  app.use('/expenses', routers.expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
