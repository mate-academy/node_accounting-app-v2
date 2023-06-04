'use strict';

const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/users', userController.getAll);

router.get('/users/:userId', userController.getOne);

router.post('/users', express.json(), userController.add);

router.delete('/users/:userId', userController.remove);

router.patch('/users/:userId', express.json(), userController.update);

module.exports = { todosRouter: router };
