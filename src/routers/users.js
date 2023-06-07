'use strict';

const express = require('express');
const userController = require('../controllers/users.js');
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:userId', userController.updateUserById);
router.delete('/:userId', userController.removeUserById);

module.exports = router;
