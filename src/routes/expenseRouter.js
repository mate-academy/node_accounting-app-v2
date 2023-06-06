'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExpenses);

expenseRouter.get('/:userId', expenseController.getExpenseByUserId);

expenseRouter.post('/', expenseController.createExpense);

expenseRouter.delete('/:userId', expenseController.removeExpense);

expenseRouter.patch('/:userId', expenseController.updateExpense);

module.exports = {
  expenseRouter,
};
