'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.postExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = { expensesRouter };
