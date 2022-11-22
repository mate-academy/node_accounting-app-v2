'use strict';

const userRouter = require('./routes/users').userRouter;
const expressRouter = require('./routes/expenses').expressRouter;

const express = require('express');
const app = express();

function createServer() {
  return (

    app.use(userRouter),

    app.use(expressRouter)
  );
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
