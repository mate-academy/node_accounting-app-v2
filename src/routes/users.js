'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getUserById);
router.post('/', usersController.createUser);
router.delete('/:userId', usersController.deleteUser);
router.patch('/:userId', usersController.updateUser);

module.exports = { router };
