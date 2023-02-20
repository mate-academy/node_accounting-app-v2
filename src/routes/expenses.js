'use strict';

const express = require('express');

const expensesController = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.get('/expenses', expensesController.getAll);

expenseRouter.get('/expenses/:expenseId', expensesController.getExpenseId);

expenseRouter.post('/expenses', express.json(), expensesController.addExpense);

expenseRouter.delete('/expenses/:expenseId', expensesController.deleteExpense);

expenseRouter.put(
  '/expenses/:expenseId', express.json(), expensesController.updateExpense
);

module.exports = expenseRouter;
