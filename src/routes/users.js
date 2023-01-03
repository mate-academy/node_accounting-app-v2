'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOneById);
usersRouter.post('/', usersController.addOne);
usersRouter.delete('/:userId', usersController.deleteOne);
usersRouter.patch('/:userId', usersController.updateOne);

module.exports = { usersRouter };
