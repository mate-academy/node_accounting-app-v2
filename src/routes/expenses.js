'use strict';

const express = require('express');
const expensesController = require('../controller/expenses.js');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getExpense);
expensesRouter.post('/', expensesController.postExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
