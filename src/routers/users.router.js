'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getOneUser);

router.post('/', userController.addUser);

router.delete('/:userId', userController.deleteUser);

router.patch('/:userId', userController.updateUser);

module.exports = {
  usersRouter: router,
};
