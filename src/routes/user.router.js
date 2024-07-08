'use strict';

const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .post('/', userController.createUser)
  .get('/:id', userController.getUserById)
  .delete('/:id', userController.removeUserById)
  .patch('/:id', userController.updateUserById);

module.exports = {
  router,
};
