'use strict';

const express = require('express');
const { userRouter } = require('./routes/users.router');
const app = express();
// const expenses = [];

function createServer() {
  app.use('/', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
