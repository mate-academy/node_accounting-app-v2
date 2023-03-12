'use strict';

const express = require('express');

const userController = require('../controller/users');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.post('/', userController.createNew);
router.delete('/:userId', userController.deleteById);
router.patch('/:userId', userController.updateById);

module.exports = {
  router,
};
