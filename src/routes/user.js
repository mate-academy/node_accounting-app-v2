'use strict';

const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.add);
router.get('/:userId', userController.getById);
router.delete('/:userId', userController.remove);
router.patch('/:userId', userController.update);

module.exports = {
  userRouter: router,
};
