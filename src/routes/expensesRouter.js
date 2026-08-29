const express = require('express');

const {
  createExpensesController,
} = require('../controllers/expensesController');

function createExpensesRouter(state) {
  const router = express.Router();

  const controller = createExpensesController(state);

  router.post('/', controller.createExpense);
  router.get('/', controller.getExpenses);
  router.get('/:id', controller.getExpense);
  router.patch('/:id', controller.updateExpense);
  router.delete('/:id', controller.deleteExpense);

  return router;
}

module.exports = {
  createExpensesRouter,
};
