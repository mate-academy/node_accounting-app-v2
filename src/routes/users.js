'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getById);

router.post('/', userController.add);

router.delete('/:userId', userController.remove);

router.patch('/:userId', userController.update);

module.exports = {
  usersRouter: router,
  initUsers: () => userController.initUsers(),
};
