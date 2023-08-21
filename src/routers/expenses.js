'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expenceController = require('../controllers/expenses.js');

expensesRouter.get('/:expenseId', expenceController.getOne);
expensesRouter.get('/', expenceController.getAll);
expensesRouter.post('/', expenceController.add);
expensesRouter.patch('/:expenseId', expenceController.updateExpense);
expensesRouter.delete('/:expenseId', expenceController.remove);

module.exports = { expensesRouter };
