'use strict';
const express = require('express');
const cors = require('cors');

const usersRouter = require('../routes/users');
const expencesRouter = require('../routes/expences');

const usersService = require('../services/users');
const expencesService = require('../services/expences');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/expences', express.json(), expencesRouter);
  app.use('/users', express.json(), usersRouter);

  expencesService.resetExpences();
  usersService.resetUsers();

  return app;
}

module.exports = {
  createServer,
};
