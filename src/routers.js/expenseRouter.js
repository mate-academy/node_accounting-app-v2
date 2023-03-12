'use strict';

const express = require('express');
const { expenseControllers } = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAllExpense);

expenseRouter.get('/:expenseId', expenseControllers.getExpenseById);

expenseRouter.post('/', express.json(), expenseControllers.addExpense);

expenseRouter.delete('/:expenseId', expenseControllers.deleteExpense);

expenseRouter.patch('/:expenseId', express.json(),
  expenseControllers.updateExpense);

module.exports = expenseRouter;
