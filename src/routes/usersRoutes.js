'use strict';

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.get('/:userId', userController.getOne);

router.delete('/:userId', userController.removeUser);

router.patch('/:userId', userController.changeUser);

module.exports = {
  router,
};
