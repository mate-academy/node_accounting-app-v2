'use strict';

const express = require('express');
const usersController = require('../controller/users');

const router = express.Router();

router.get('/users', usersController.getAll);
router.get('/users/:userId', usersController.getOne);
router.post('/users', express.json(), usersController.addOne);
router.delete('/users/:userId', usersController.deleteOne);
router.patch('/users/:userId', express.json(), usersController.updateOne);

module.exports = { router };
