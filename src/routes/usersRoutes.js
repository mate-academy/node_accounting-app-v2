'use strict';

const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/userController');

usersRouter.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

usersRouter.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = { usersRouter };
