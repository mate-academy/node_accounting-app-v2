'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getFilteredExpense);

expensesRouter.get('/:expenseId', expensesController.getOneExpense);

expensesRouter.post('/', express.json(), expensesController.addExpense);

expensesRouter.delete('/:expenseId', expensesController.removeExpense);

expensesRouter.patch('/:expenseId', expensesController.updatedExpense);

module.exports = { expensesRouter };
