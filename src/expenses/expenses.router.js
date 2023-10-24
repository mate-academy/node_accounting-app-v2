'use strict';

const express = require('express');
const expensesRouter = express.Router();
const { expensesController } = require('./expenses.controller');

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.post('/', expensesController.addNextExpense);

expensesRouter.delete('/:expenseId', expensesController.deleteExpense);

expensesRouter.get('/:expenseId', expensesController.getOneExpense);

expensesRouter.put('/:expenseId', expensesController.expenseToUpdate);

module.exports = { expensesRouter };
