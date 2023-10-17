'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.getAll);

router.get('/:id', userController.findUserById);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);

router.patch('/:id', userController.updateUser);

module.exports = {
  router,
};
