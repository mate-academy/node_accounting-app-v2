'use strict';

const express = require('express');
const { userController } = require('./user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/', express.json(), userController.addUser);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', express.json(), userController.updateUser);

module.exports = { router: router };
