'use strict';

const express = require('express');
const expensesController = require('../controlles/expenses.js');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/', expensesController.getExpense);
expensesRouter.post('/', expensesController.postExpense);
expensesRouter.delete('/:userId', expensesController.deleteExpense);
expensesRouter.patch('/:userId', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
