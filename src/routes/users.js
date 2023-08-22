'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getOneUser);
router.post('/', express.json(), userController.addUser);
router.delete('/:userId', userController.removeUser);
router.patch('/:userId', express.json(), userController.updateUser);

module.exports = { router };
