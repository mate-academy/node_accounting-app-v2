'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExpenses);

expenseRouter.get('/:expenseId', expenseController.getExpenseByUserId);

expenseRouter.post('/', expenseController.createExpense);

expenseRouter.delete('/:expenseId', expenseController.removeExpense);

expenseRouter.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  expenseRouter,
};
