const { Router } = require('express');
const express = require('express');
const createExpControllers = require('../controllers/expensesControllers');
const { isValidId, isValidBody } = require('../middleware/middleware');

function createExpRouter(expService, usersService) {
  const expensesRouter = Router();
  const expControllers = createExpControllers(expService, usersService);

  expensesRouter.get('/', expControllers.getAll());
  expensesRouter.get('/:id', isValidId, expControllers.getByExpId());

  expensesRouter.post(
    '/',
    express.json(),
    isValidBody,
    expControllers.addExp(),
  );
  expensesRouter.delete('/:id', isValidId, expControllers.deleteExp());

  expensesRouter.patch(
    '/:id',
    isValidId,
    express.json(),
    isValidBody,
    expControllers.updatedExp(),
  );

  return expensesRouter;
}

module.exports = createExpRouter;
