const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getExpensesById);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:id', expensesController.removeExpenses);
expensesRouter.patch('/:id', expensesController.updateExpenses);

module.exports = expensesRouter;
