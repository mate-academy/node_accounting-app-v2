import express from 'express';
import * as UsersController from '../users/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/', UsersController.getAll);
usersRouter.post('/', UsersController.create);
usersRouter.get('/:id', UsersController.getById);
usersRouter.delete('/:id', UsersController.removeById);
usersRouter.patch('/:id', UsersController.update);
