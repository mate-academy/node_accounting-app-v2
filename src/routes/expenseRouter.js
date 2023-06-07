'use strict';

const express = require('express');
const expenseController = require('../conrollers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpenses);
expenseRouter.get('/:expenseId', expenseController.getExpenseById);
expenseRouter.post('/', expenseController.createExpense);
expenseRouter.delete('/:expenseId', expenseController.deleteExpense);
expenseRouter.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  expenseRouter,
};
