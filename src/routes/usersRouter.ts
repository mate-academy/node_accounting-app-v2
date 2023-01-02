import express from 'express';
import * as usersController from '../controllers/usersController';

export const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAll);

usersRouter.get('/users/:userId', usersController.findOne);

usersRouter.post('/users', express.json(), usersController.addOne);

usersRouter.patch('/users/:userId', express.json(), usersController.updateOne);

usersRouter.delete('/users/:userId', usersController.deleteOne);
