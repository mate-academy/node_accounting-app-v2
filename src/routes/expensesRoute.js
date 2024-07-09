const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = Router();

router.get('/', expensesController.getAllExpenses);

router.get('/:id', expensesController.getByIdExpense);

router.post('/', expensesController.createExpense);

router.delete('/:id', expensesController.removeExpense);

router.patch('/:id', expensesController.updateExpense);

module.exports = {
  router,
};
