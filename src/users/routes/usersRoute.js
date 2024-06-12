'use strict';

const express = require('express');

const userController = require('../controller/user.controller')
  .controller;

const router = express.Router();

router.get('/', userController.get);
router.post('/', userController.post);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.patch);

module.exports = {
  router,
};
