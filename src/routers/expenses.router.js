'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.createNewExpense);

expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = {
  expensesRouter,
};
