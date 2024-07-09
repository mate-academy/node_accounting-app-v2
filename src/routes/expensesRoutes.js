const express = require('express');
const expensesController = require('../controllers/expensesController');
const router = express.Router();

router
  .get('/', expensesController.getAllExpenses)
  .post('/', expensesController.createExpense)
  .get('/:id', expensesController.getOneExpense)
  .patch('/:id', expensesController.updateExpense)
  .delete('/:id', expensesController.removeExpense);

module.exports = router;
