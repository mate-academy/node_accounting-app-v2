'use strict';

const express = require('express');
const expensesRouter = express.Router();

const expensesController = require('../controllers/expenses');

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.addExpense);
expensesRouter.get('/:expenseId', expensesController.getExpense);
expensesRouter.patch('/:expenseId', expensesController.editExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);

module.exports = {
  expensesRouter,
};
