'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getUser);
router.post('/', express.json(), userController.createUser);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', express.json(), userController.updateUser);

module.exports = { router };
