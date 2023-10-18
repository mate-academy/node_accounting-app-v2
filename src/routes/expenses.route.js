'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesControllers = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesControllers.getAll);
expensesRouter.post('/', expensesControllers.add);
expensesRouter.get('/:expenseId', expensesControllers.getCurrentExpense);
expensesRouter.patch('/:expenseId', expensesControllers.update);
expensesRouter.delete('/:expenseId', expensesControllers.remove);

module.exports = {
  expensesRouter,
};
