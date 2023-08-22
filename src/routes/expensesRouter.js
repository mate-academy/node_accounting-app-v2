/* eslint-disable max-len */
'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:expenseId', expensesController.getExpense);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = { expensesRouter };
