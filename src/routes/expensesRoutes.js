const createExpensesRoutes = (expensesController) => {
  const express = require('express');

  const expensesRoutes = express.Router();

  expensesRoutes.get('/', expensesController.getExpenses);
  expensesRoutes.get('/:id', expensesController.getExpenseById);
  expensesRoutes.post('/', expensesController.postExpense);
  expensesRoutes.patch('/:id', expensesController.patchExpense);
  expensesRoutes.delete('/:id', expensesController.deleteExpense);

  return expensesRoutes;
};

module.exports = {
  createExpensesRoutes,
};
