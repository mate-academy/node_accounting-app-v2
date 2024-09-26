'use strict';

const express = require('express');
const usersController = require('../controllers/users.controllers');

const router = express.Router();

router.get('/', express.json(), usersController.getAllUsers);
router.get('/:userId', usersController.getUser);
router.post('/', usersController.createUser);
router.delete('/:userId', usersController.removeUser);
router.patch('/:userId', usersController.updateUser);

module.exports = { router };
