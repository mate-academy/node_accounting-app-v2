const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:expenseId', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:expenseId', expensesController.remove);
expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = {
  expensesRouter,
};
