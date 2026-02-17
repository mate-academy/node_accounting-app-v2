const express = require('express');

const createExpenseRouter = (expenseControllers) => {
  const router = express.Router();

  router.get('/', expenseControllers.get);

  router.get('/:id', expenseControllers.getById);

  router.post('/', expenseControllers.add);

  router.patch('/:id', expenseControllers.update);

  router.delete('/:id', expenseControllers.remove);

  return router;
};

module.exports = { createExpenseRouter };
