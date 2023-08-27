'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses.js');

expensesRouter.get('/:expenseId', expensesController.getOne);
expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.add);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);
expensesRouter.delete('/:expenseId', expensesController.remove);

module.exports = { expensesRouter };
