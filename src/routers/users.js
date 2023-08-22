'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUser);
router.delete('/:userId', usersController.deleteUser);
router.post('/', usersController.addUser);
router.patch('/:userId', usersController.updateUser);

module.exports.usersRouter = router;
