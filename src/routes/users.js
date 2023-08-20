'use strict';

const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/userController');

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.getOne);

usersRouter.post('/', usersController.add);

usersRouter.patch('/:userId', usersController.update);

usersRouter.delete('/:userId', usersController.remove);

module.exports = { usersRouter };
