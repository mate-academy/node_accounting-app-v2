'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersController.getUser);

router.post('/', express.json(), usersController.postUser);

router.delete('/:userId', usersController.deleteUser);

router.patch('/:userId', express.json(), usersController.patchUser);

module.exports = { router };
