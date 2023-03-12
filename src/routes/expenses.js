'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getOne);
expensesRouter.post('/', expensesController.addNewExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = expensesRouter;
