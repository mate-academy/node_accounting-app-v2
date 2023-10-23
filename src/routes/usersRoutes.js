'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.post('/users', usersController.createUser);
router.patch('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
