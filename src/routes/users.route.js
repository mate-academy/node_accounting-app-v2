import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';

export const router = Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getById);

router.post('/', usersController.create);

router.delete('/:id', usersController.deleteById);

router.patch('/:id', usersController.update);
