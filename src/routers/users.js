'use strict';

const express = require('express');
const userController = require('../controllers/users.js');
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getUser);
router.post('/', userController.createUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.removeUser);

module.exports = router;
