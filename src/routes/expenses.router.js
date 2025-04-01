const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getExpenseByFilter);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:expenseId', expensesController.getExpenseById);
expensesRouter.delete('/:expenseId', expensesController.deleteExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = expensesRouter;
