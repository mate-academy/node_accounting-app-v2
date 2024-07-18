const expensesService = require('../services/expenses.service');

const express = require('express');

const router = express.Router();

router.get('/', expensesService.getAll);
router.get('/:id', expensesService.getOne);
router.post('/', expensesService.createExpense);
router.delete('/:id', expensesService.deleteExpense);
router.patch('/:id', expensesService.updateOne);

module.exports = {
  router,
};
