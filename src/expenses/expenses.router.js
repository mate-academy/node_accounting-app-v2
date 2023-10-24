'use strict';

const express = require('express');
const expensesRouter = express.Router();
const { expensesController } = require('./expenses.controller');

expensesRouter.get('/expenses', expensesController.getAllExpenses);

expensesRouter.post('/expenses', expensesController.addNextExpense);

expensesRouter.delete('/expenses/:expenseId', expensesController.deleteExpense);

expensesRouter.get('/expenses/:expenseId', expensesController.getOneExpense);

expensesRouter.put('/expenses/:expenseId', expensesController.expenseToUpdate);

module.exports = { expensesRouter };
