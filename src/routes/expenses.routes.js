const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');

module.exports = function (users, expenses) {
  const expensesRouter = express.Router();

  expensesRouter.get('/', expensesController.getAllExpenses(expenses));

  expensesRouter.post('/', expensesController.postExpenses(users, expenses));

  expensesRouter.get('/:id', expensesController.getExpenseById(expenses));

  expensesRouter.delete('/:id', expensesController.deleteExpense(expenses));

  expensesRouter.patch('/:id', expensesController.patchExpense(expenses));

  return expensesRouter;
};
