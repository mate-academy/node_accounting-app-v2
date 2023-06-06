'use strict';

const express = require('express');
const usersServices = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/', usersServices.getAll);
usersRouter.get('/:userId', usersServices.getOne);
usersRouter.post('/', usersServices.create);
usersRouter.delete('/:userId', usersServices.remove);
usersRouter.patch('/:userId', usersServices.update);

module.exports = usersRouter;
