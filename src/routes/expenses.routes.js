'use strict';

const express = require('express');
const expensesRouter = express.Router();
const controller = require('../controllers/expenses.controller');

expensesRouter.get('/:id', controller.getExpense);
expensesRouter.get('/', controller.getAllExpenses);
expensesRouter.post('/', controller.postExpense);
expensesRouter.patch('/:id', controller.updateExpense);
expensesRouter.delete('/:id', controller.deleteExpense);

module.exports = {
  expensesRouter,
};
