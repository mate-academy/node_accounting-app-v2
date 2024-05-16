const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const { validateExpenseInput } = require('../middleware/validationMiddleware');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post(
  '/',
  validateExpenseInput,
  expensesController.createExpense,
);
expensesRouter.get('/:id', expensesController.getById);
expensesRouter.delete('/:id', expensesController.removeExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
