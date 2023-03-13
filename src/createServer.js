'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./routes');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', router);
  app.use('/expenses', router);

  return app;
};

module.exports = {
  createServer,
};
