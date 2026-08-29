const express = require('express');

const { createUsersController } = require('../controllers/usersController');

function createUsersRouter(state) {
  const router = express.Router();

  const controller = createUsersController(state);

  router.post('/', controller.createUser);
  router.get('/', controller.getUsers);
  router.get('/:id', controller.getUser);
  router.patch('/:id', controller.updateUser);
  router.put('/:id', controller.updateUser);
  router.delete('/:id', controller.deleteUser);

  return router;
}

module.exports = {
  createUsersRouter,
};
