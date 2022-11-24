'use strict';

const express = require('express');

const expensesControllers = require('../controllers/expenses_controllers');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesControllers.getExpenses);

expensesRouter.get('/:id', expensesControllers.getExpenseById);

expensesRouter.post('/', expensesControllers.addExpense);

expensesRouter.delete('/:id', expensesControllers.removeExpense);

expensesRouter.patch('/:id', expensesControllers.updateExpense);

module.exports = { expensesRouter };
