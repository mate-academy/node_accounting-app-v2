'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expenseController = require('../controllers/expenses');

expensesRouter.route('/')
  .get(expenseController.getAll)
  .post(expenseController.createExpense);

expensesRouter.route('/:expenseId')
  .get(expenseController.findExpense)
  .delete(expenseController.deleteExpense)
  .patch(expenseController.updateExpense);

module.exports = { expensesRouter };
