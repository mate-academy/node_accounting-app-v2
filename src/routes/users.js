'use strict';

const express = require('express');
const usersController = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.getOne);

usersRouter.post('/', express.json(), usersController.add);

usersRouter.patch('/:userId', express.json(), usersController.update);

usersRouter.delete('/:userId', usersController.remove);

module.exports = usersRouter;
