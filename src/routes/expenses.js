'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:expenseId', expensesController.getOneExpence);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:expenseId', expensesController.removeExpense);

expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = { expensesRouter };
