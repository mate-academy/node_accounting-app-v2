'use strict';

const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

router.post('/', userController.createUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = { router };
