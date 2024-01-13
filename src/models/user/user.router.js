'use strict';

const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/:id', userController.remove);
router.post('/', express.json(), userController.create);
router.patch('/:id', express.json(), userController.update);

module.exports = {
  usersRouter: router,
};
