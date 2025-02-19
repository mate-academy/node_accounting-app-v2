'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesControllers = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesControllers.getAllExpenses);

expensesRouter.post('/', expensesControllers.addExpense);

expensesRouter.get('/:expenseId', expensesControllers.getCurrentExpense);

expensesRouter.delete('/:expenseId', expensesControllers.removeExpense);

expensesRouter.patch('/:expenseId', expensesControllers.updateExpense);

module.exports = { expensesRouter };
