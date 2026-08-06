const { Router } = require('express');

function createExpensesRouter(expensesController) {
  const router = Router();

  router.get('/', expensesController.getAll);
  router.post('/', expensesController.create);
  router.get('/:id', expensesController.getOne);
  router.delete('/:id', expensesController.remove);
  router.patch('/:id', expensesController.update);

  return router;
}

module.exports = { createExpensesRouter };
