'use strict';

const express = require('express');
const expensesRouter = express.Router();

const {
  getAllExpensesController,
  getOneExpenseController,
  createExpenseController,
  removeExpenseController,
  updateExpenseController,
} = require('../controllers/expenseController');

expensesRouter.get('/', getAllExpensesController);
expensesRouter.get('/:expenseId', getOneExpenseController);
expensesRouter.post('/', createExpenseController);
expensesRouter.delete('/:expenseId', removeExpenseController);
expensesRouter.patch('/:expenseId', updateExpenseController);

module.exports = {
  expensesRouter,
};
