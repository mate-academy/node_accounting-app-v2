const express = require('express');
const userController = require('./users.controller.js');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.removeUser);

module.exports = router;
