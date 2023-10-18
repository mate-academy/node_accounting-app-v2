'use strict';

const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../controllers/users.controller');

usersRouter.get('/', usersControllers.getAll);
usersRouter.post('/', usersControllers.add);
usersRouter.get('/:userId', usersControllers.getCurrentUser);
usersRouter.patch('/:userId', usersControllers.update);
usersRouter.delete('/:userId', usersControllers.remove);

module.exports = {
  usersRouter,
};
