'use strict';

const {
  controllerPostExpense,
  controllerGetExpenses,
  controllerGetExpenseById,
  controllerDeleteExpense,
  controllerPatchExpense,
} = require('../controllers/expenses');

const express = require('express');

const expensesRouter = express.Router();

expensesRouter.post('/', controllerPostExpense);

expensesRouter.get('/', controllerGetExpenses);

expensesRouter.get('/:expenseId', controllerGetExpenseById);

expensesRouter.delete('/:expenseId', controllerDeleteExpense);

expensesRouter.patch('/:expenseId', controllerPatchExpense);

module.exports = { expensesRouter };
