const express = require('express');
const app = express();

const expensesRouter = require('./src/routes/expenses');

app.use(express.json());
app.use('/expenses', expensesRouter);

module.exports = app;
