'use strict';

const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', express.json(), userController.createUser);
router.get('/:id', express.json(), userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.patch('/:id', express.json(), userController.updateUserName);

module.exports = router;
