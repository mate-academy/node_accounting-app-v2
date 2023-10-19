'use strict';

const express = require('express');
const controller = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', controller.getAll);

usersRouter.post('/', controller.post);

usersRouter.get('/:id', controller.getById);

usersRouter.delete('/:id', controller.remove);

usersRouter.patch('/:id', controller.update);

module.exports = { usersRouter };
