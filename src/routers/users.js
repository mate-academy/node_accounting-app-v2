'use strict';

const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/users.js');

usersRouter.get('/:userId', userController.getOne);
usersRouter.get('/', userController.getAll);
usersRouter.post('/', userController.add);
usersRouter.patch('/:userId', userController.update);
usersRouter.delete('/:userId', userController.remove);

module.exports = { usersRouter };
