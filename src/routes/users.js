'use strict';

const {
  controllerDeleteUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerPostUser,
  controllerUpdateUser,
} = require('../controllers/users');

const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/', controllerPostUser);

usersRouter.get('/', controllerGetAllUsers);

usersRouter.get('/:userId', controllerGetUserById);

usersRouter.delete('/:userId', controllerDeleteUser);

usersRouter.patch('/:userId', controllerUpdateUser);

module.exports = { usersRouter };
