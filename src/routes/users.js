'use strict';

const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/users');

usersRouter.route('/')
  .get(userController.getAll)
  .post(userController.createUser);

usersRouter.route('/:userId')
  .get(userController.findUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = { usersRouter };
