'use strict';

const usersController = require('../controllers/users.controller');

const express = require('express');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.post('/', usersController.createUser);

router.get('/:id', usersController.getUserById);

router.delete('/:id', usersController.deleteUser);

router.patch('/:id', usersController.updateUser);

module.exports = {
  router,
};
