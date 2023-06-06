'use strict';

const express = require('express');
const cors = require('cors');
const userServices = require('./services/users');
const expenceServices = require('./services/expences');
const usersRouter = require('./routes/usersRoutes');
const expencesRouter = require('./routes/expencesRoutes');

function createServer() {
  const server = express();

  server.use(cors());

  userServices.reset();
  expenceServices.reset();

  server.use('/users', usersRouter);
  server.use('/expenses', expencesRouter);

  return server;
};

module.exports = {
  createServer,
};
