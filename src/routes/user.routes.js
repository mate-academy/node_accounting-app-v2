const express = require('express');

const { createUserController } = require('../controllers/user.controller');

function createUserRouter(store) {
  const c = createUserController(store);
  const router = express.Router();

  router.get('/', c.getUsers);
  router.post('/', c.createUser);
  router.get('/:id', c.getUserById);
  router.delete('/:id', c.deleteUser);
  router.patch('/:id', c.patchUser);
  router.put('/:id', c.putUser);

  return router;
}

module.exports = { createUserRouter };
