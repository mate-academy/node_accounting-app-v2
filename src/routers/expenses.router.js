'use strict';

const express = require('express');
const { ExpensesController } = require('../controllers/expenses.controller');
const ExpensesRouter = express.Router();

ExpensesRouter.get('/', ExpensesController.getExpenses);

ExpensesRouter.get('/:id', ExpensesController.getExpense);

ExpensesRouter.delete('/:id', ExpensesController.deleteExpense);

ExpensesRouter.post('/', ExpensesController.createExpense);

ExpensesRouter.patch('/:id', ExpensesController.updateExpense);

module.exports = {
  ExpensesRouter,
};
