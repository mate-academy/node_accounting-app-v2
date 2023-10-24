'use strict';

const express = require('express');
const app = express();

const expensesRouter = require('./expensesRouter');

app.use('/expenses', expensesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
