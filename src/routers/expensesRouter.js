'use strict';

const { Router } = require('express');

function createExpensesRouter(expensesController) {
  const expensesRouter = Router();

  expensesRouter.get('/', expensesController.getExpenses);
  expensesRouter.get('/:id', expensesController.getExpenseById);
  expensesRouter.post('/', expensesController.createExpense);
  expensesRouter.patch('/:id', expensesController.updateExpense);
  expensesRouter.delete('/:id', expensesController.deleteExpense);

  return expensesRouter;
}

module.exports = {
  createExpensesRouter,
};
