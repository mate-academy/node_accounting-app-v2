'use strict';

const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getAllUsers);

router.post('/', userController.addUser);

router.get('/:id', userController.getUserById);

router.delete('/:id', userController.removeUserById);

router.patch('/:id', userController.updateUserById);

module.exports = router;
