'use strict';

const express = require('express');
const usersController = require('./usersController');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersController.getSingleUser);

router.post('/', usersController.addUser);

router.patch('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

module.exports.router = router;
