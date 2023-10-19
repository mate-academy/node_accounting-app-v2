'use strict';

const express = require('express');
const { UserController } = require('../controllers/users.controller');
const UserRouter = express.Router();

UserRouter.get('', UserController.getUsers);

UserRouter.get('/:id', UserController.getUser);

UserRouter.post('', express.json(), UserController.createUser);

UserRouter.delete('/:id', UserController.deleteUser);

UserRouter.patch('/:id', express.json(), UserController.updateUser);

module.exports = {
  UserRouter,
};
