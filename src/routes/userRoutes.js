const { Router } = require('express');
const {
  GetAllUsersController,
  GetUserController,
  CreateUserController,
  EditUserController,
  DeleteUserController,
} = require('../controllers/user');
const {
  verifyIfIdIsANumber,
  verifyIfUserExists,
  verifyUserFields,
} = require('../middlewares');

const userRoutes = Router();

userRoutes.get('/', GetAllUsersController.handle);

userRoutes.get(
  '/:id',
  verifyIfIdIsANumber,
  verifyIfUserExists,
  GetUserController.handle,
);
userRoutes.post('/', verifyUserFields, CreateUserController.handle);

userRoutes.patch(
  '/:id',
  verifyIfIdIsANumber,
  verifyIfUserExists,
  verifyUserFields,
  EditUserController.handle,
);

userRoutes.delete(
  '/:id',
  verifyIfIdIsANumber,
  verifyIfUserExists,
  DeleteUserController.handle,
);

module.exports = userRoutes;
