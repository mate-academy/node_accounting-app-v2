'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRoutes);

  return app;
}

module.exports = {
  createServer,
};
