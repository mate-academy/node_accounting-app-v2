'use strict';

const express = require('express');
const { usersController } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getById);
usersRouter.post('/', express.json(), usersController.add);
usersRouter.delete('/:userId', usersController.remove);
usersRouter.patch('/:userId', express.json(), usersController.update);

module.exports = usersRouter;
