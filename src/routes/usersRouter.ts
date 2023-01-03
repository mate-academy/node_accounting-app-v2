import express from 'express';
import * as usersController from '../controllers/usersController';

export const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.findOne);

usersRouter.post('/', usersController.addOne);

usersRouter.patch('/:userId', usersController.updateOne);

usersRouter.delete('/:userId', usersController.deleteOne);
