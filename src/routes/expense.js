'use strict';

const express = require('express');

const expenseController = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExpenses);
expenseRouter.post('/', expenseController.createExpense);
expenseRouter.get('/:expenseId', expenseController.getExpenseById);
expenseRouter.delete('/:expenseId', expenseController.removeExpense);
expenseRouter.patch('/:expenseId', expenseController.updateExpense);

module.exports = ({ expenseRouter });
