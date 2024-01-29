'use strict';

const express = require('express');
const app = express();

app.use(express.json());

const usersRouter = require('./src/routers/usersRouter');
const expensesRouter = require('./src/routers/expensesRouter');

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${process.env.PORT || 3000}`);
});
