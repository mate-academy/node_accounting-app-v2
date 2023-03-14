'use strict';

const expensesRouter = require('express').Router();
const { expensesController } = require('../controllers/expenses.js');

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getById);
expensesRouter.post('/', expensesController.add);
expensesRouter.delete('/:expenseId', expensesController.remove);
expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = {
  expensesRouter,
};
