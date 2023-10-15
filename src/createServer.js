'use strict';

const cors = require('cors');
const userRouter = require('./users/routes/user.route.js');

const express = require('express');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
