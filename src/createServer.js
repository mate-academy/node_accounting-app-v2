'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRouters.js');
const expensesRoutes = require('./routes/expensesRouters.js');
const usersControllers = require('./controllers/usersControllers.js');
const expensesControllers = require('./controllers/expensesControllers.js');

function createServer() {
  const app = express();

  app.use('/', bodyParser.json(), usersRoutes);
  usersControllers.init();

  app.use('/', bodyParser.json(), expensesRoutes);
  expensesControllers.init();

  return app;
}

module.exports = {
  createServer,
};
