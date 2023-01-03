'use strict';

import * as usersController from '../controllers/users.js';
import express from 'express';


export const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', usersController.add);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);
