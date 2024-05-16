const express = require('express');
const usersController = require('../controllers/users.controller');
const validationMiddleware = require('../middleware/validationMiddleware');
const { handleErrors } = require('../middleware/handleErrorsMiddleware');

const usersRouter = express.Router();

usersRouter.get('/', handleErrors(usersController.getAll));

usersRouter.post(
  '/',
  validationMiddleware.validateUserInput,
  handleErrors(usersController.createUser),
);

usersRouter.get(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(usersController.getUserById),
);

usersRouter.delete(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(usersController.removeUser),
);

usersRouter.patch(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(usersController.updateUser),
);

module.exports = {
  usersRouter,
};
