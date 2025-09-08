const express = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/expenses', expensesController.getExpenses);
expensesRouter.post('/expenses', expensesController.createExpense);
expensesRouter.get('/expenses/:id', expensesController.getExpense);
expensesRouter.delete('/expenses/:id', expensesController.deleteExpense);
expensesRouter.patch('/expenses/:id', expensesController.updateExpense);

module.exports = expensesRouter;
