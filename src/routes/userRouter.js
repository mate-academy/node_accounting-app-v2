'use strict';

const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.removeUserById);
router.patch('/:id', userController.updateUserById);

module.exports = {
  router,
};
