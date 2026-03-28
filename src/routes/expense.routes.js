const express = require('express');
const {
  createExpenseController,
} = require('../controllers/expense.controller');

function createExpenseRouter(store) {
  const c = createExpenseController(store);
  const router = express.Router();

  router.get('/', c.getExpenses);
  router.post('/', c.createExpense);
  router.get('/:id', c.findExpenseById);
  router.delete('/:id', c.deleteExpense);
  router.patch('/:id', c.updateExpense);

  return router;
}

module.exports = { createExpenseRouter };
