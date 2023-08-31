'use strict';

const express = require('express');
const expensesRouter = express.Router();

// The typographical error is found where 'expenceController' is used.
// Please correct it to 'expenseController'. Fix all typos
const expenseController = require('../controllers/expenses.js');

expensesRouter.get('/', expenseController.getAll);

expensesRouter.get('/:expenseId', expenseController.getOne);

expensesRouter.post('/', expenseController.add);

expensesRouter.patch('/:expenseId', expenseController.updateExpense);

expensesRouter.delete('/:expenseId', expenseController.remove);

module.exports = { expensesRouter };
