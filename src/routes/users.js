'use strict';

const UserController = require('../controllers/users');

const express = require('express');

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.post('/', UserController.addNewUser);

router.get('/:userId', UserController.getOneUser);

router.delete('/:userId', UserController.deleteUser);

router.patch('/:userId', UserController.updateUser);

module.exports = {
  router,
};
