const express = require('express');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenses.controller');

expenseRouter.get('/', expenseController.getExpensesController);

expenseRouter.get('/:id', expenseController.getExpenseByIdController);

expenseRouter.post('/', express.json(), expenseController.addExpenseController);

expenseRouter.delete('/:id', expenseController.deleteExpenseController);

expenseRouter.patch(
  '/:id',
  express.json(),
  expenseController.updateExpenseController,
);

module.exports = expenseRouter;
