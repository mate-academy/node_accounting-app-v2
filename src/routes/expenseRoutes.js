'use strict';

const express = require('express');
const {
  getOnceExpenses,
  getExpenses,
  creatNewExpenses,
  patchExpense,
  removeExpenses,
} = require('../controller/expenseController');
const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);
expensesRouter.get('/:id', getOnceExpenses);
expensesRouter.post('/', creatNewExpenses);
expensesRouter.patch('/:id', patchExpense);
expensesRouter.delete('/:id', removeExpenses);

module.exports = {
  expensesRouter,
};
