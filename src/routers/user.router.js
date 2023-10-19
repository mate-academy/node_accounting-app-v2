'use strict';

const express = require('express');
const { UserController } = require('../controllers/users.controller');
const UserRouter = express.Router();

UserRouter.get('/', UserController.getUsers);

UserRouter.get('/:id', UserController.getUser);

UserRouter.post('/', UserController.createUser);

UserRouter.delete('/:id', UserController.deleteUser);

UserRouter.patch('/:id', UserController.updateUser);

module.exports = {
  UserRouter,
};
