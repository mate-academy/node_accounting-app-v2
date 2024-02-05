'use strict';

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersRouter = require('./src/routers/usersRouter');
const expensesRouter = require('./src/routers/expensesRouter');

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on localhost:${PORT}`);
});
