const express = require('express');
const { createUserControllers } = require('../controllers/user.controllers');

const createUserRouter = (usersService) => {
  const router = express.Router();

  const userControllers = createUserControllers(usersService);

  router.get('/', userControllers.get);

  router.get('/:id', userControllers.getById);

  router.post('/', userControllers.create);

  router.patch('/:id', userControllers.update);

  router.delete('/:id', userControllers.deleteUser);

  return router;
};

module.exports = { createUserRouter };
