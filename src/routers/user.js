'use strict';

const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.use(express.json());

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.delete('/:userId', userController.deleteUserById);

router.patch('/:userId', userController.updateUserById);

router.post('/', userController.createUser);

module.exports = router;
