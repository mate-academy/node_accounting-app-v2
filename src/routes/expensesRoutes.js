'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expenseController = require('../controllers/expenseController');

expensesRouter.route('/')
  .get(expenseController.getExpenses)
  .post(expenseController.createExpense);

expensesRouter.route('/:id')
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = { expensesRouter };
