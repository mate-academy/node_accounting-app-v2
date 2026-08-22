'use strict';

const express = require('express');
const { createUsersController } = require('../controllers/users.controller');

function createUsersRouter(usersService) {
  const router = express.Router();
  const usersController = createUsersController(usersService);

  router.get('/', usersController.getAll);
  router.get('/:id', usersController.getOne);
  router.post('/', usersController.create);
  router.put('/:id', usersController.update);
  router.patch('/:id', usersController.update);
  router.delete('/:id', usersController.remove);

  return router;
}

module.exports = {
  createUsersRouter,
};
