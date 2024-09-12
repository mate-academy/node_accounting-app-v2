'use strict';

const UserController = require('../controllers/users');

const express = require('express');

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.post('/', UserController.addNewUsers);

router.get('/:userId', UserController.getOneUsers);

router.delete('/:userId', UserController.deleteUsers);

router.patch('/:userId', UserController.getAllUsers);

module.exports = {
  router,
};
