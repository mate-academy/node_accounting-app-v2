'use strict';

const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/', userController.getAllUser);

userRoutes.get('/:userId', userController.getUserById);

userRoutes.post('/', userController.createUser);

userRoutes.delete('/:id', userController.deleteUser);

userRoutes.patch('/:id', userController.updateUser);

module.exports = { userRoutes };
