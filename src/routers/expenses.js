'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');

const expensesRouter = express.Router();

expensesRouter.get('/:expenseId', expensesController.getExpense);
expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);
expensesRouter.post('/', expensesController.addExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = { expensesRouter };
