'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.get('/:id', expensesController.getExpenseById);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.removeExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = { expensesRouter };
