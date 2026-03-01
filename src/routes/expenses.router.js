const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getOneExpense);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:id', expensesController.deleteOneExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.put('/:id', expensesController.updateExpense);

module.exports = expensesRouter;
