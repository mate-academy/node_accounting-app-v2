'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {
  createExpenseControll,
  getAllExpensesControll,
  getExpenseByIdControll,
  deleteExpenseControll,
  updateExpenseControll,
} = require('../Controllers/Expenses.controller');

const expensesRouter = express.Router();

expensesRouter.use(bodyParser.json());

expensesRouter.post('/', createExpenseControll);

expensesRouter.get('/', getAllExpensesControll);

expensesRouter.get('/:id', getExpenseByIdControll);

expensesRouter.delete('/:id', deleteExpenseControll);

expensesRouter.patch('/:id', updateExpenseControll);

module.exports = {
  expensesRouter,
};
