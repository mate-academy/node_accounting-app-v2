const { Router } = require('express');

function createUsersRouter(usersController) {
  const router = Router();

  router.get('/', usersController.getAll);
  router.post('/', usersController.create);
  router.get('/:id', usersController.getOne);
  router.delete('/:id', usersController.remove);
  router.patch('/:id', usersController.update);

  return router;
}

module.exports = { createUsersRouter };
