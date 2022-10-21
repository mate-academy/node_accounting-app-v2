'use strict';

const express = require('express');
const { usersRoute } = require('./users');

function createServer() {
  const app = express();
  const users = [];

  app.use(express.json());

  const userRouter = express.Router();

  usersRoute(userRouter, users);

  app.use('/users', userRouter);
}

module.exports = {
  createServer,
};
