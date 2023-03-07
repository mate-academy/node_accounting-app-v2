'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./routes');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), router);
  app.use('/expenses', express.json(), router);

  return app;
};

module.exports = {
  createServer,
};
