const { Router } = require('express');
const { expensesController } = require('./expenses.controller.js');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.delete('/:id', expensesController.deleteExpenseById);
expensesRouter.patch('/:id', expensesController.updateExpenseById);

module.exports = {
  expensesRouter,
};
