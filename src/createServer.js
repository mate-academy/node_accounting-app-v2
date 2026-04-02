'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routers/expenses.router.js');
const usersRouter = require('./routers/users.router.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    // console.log('--- REQUEST ---');
    // console.log(req.method, req.originalUrl);
    // console.log('params:', req.params);
    // console.log('query:', req.query);
    // console.log('body:', req.body);

    // res.on('finish', () => {
    //   console.group();
    //   console.log('--- RESPONSE ---');
    //   console.log(req.method, req.originalUrl, '->', res.statusCode);

    //   console.groupEnd();
    // });

    next();
  });

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
