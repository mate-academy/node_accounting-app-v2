const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.post('/', expensesController.createExpense);

router.get('/', expensesController.getExpenses);

router.get('/:id', expensesController.getExpense);

router.delete('/:id', expensesController.deleteExpense);

router.patch('/:id', expensesController.updateExpense);

module.exports = {
  router,
};
