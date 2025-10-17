const { Router } = require('express');
const express = require('express');
const createUserControllers = require('../controllers/userControllers');
const { isValidId, isValidBody } = require('../middleware/middleware');

function createUserRouter(usersService) {
  const userRouter = Router();
  const userControllers = createUserControllers(usersService);

  userRouter.get('/', userControllers.getAll());
  userRouter.get('/:id', isValidId, userControllers.getByUserId());
  userRouter.post('/', express.json(), isValidBody, userControllers.addUser());
  userRouter.delete('/:id', isValidId, userControllers.deleteUser());

  userRouter.patch(
    '/:id',
    isValidId,
    express.json(),
    isValidBody,
    userControllers.updatedUser(),
  );

  return userRouter;
}

module.exports = createUserRouter;
