'use strict';

const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../Controllers/users');

usersRouter.get('/', usersControllers.getAll);

usersRouter.post('/', usersControllers.add);

usersRouter.get('/:userId', usersControllers.getUser);

usersRouter.delete('/:userId', usersControllers.remove);

usersRouter.patch('/:userId', usersControllers.update);

module.exports = { usersRouter };
