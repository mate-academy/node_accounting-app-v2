'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expenseController.getAll);
expensesRouter.get('/:expenseId', expenseController.getOne);
expensesRouter.post('/', expenseController.create);
expensesRouter.delete('/:expenseId', expenseController.remove);
expensesRouter.patch('/:expenseId', expenseController.change);

module.exports = {
  expensesRouter,
};
