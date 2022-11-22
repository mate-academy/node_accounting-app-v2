'use strict';

const express = require('express');

const userControllers = require('../controllers/user');

const router = express.Router();

router.get('/users', userControllers.getAll);

router.get('/users/:todoId', userControllers.getUser);

router.post('/users', express.json(), userControllers.createNewUser);

router.delete('/users/:userId', userControllers.deleteUser);

router.patch('/users/:userId', express.json(), userControllers.updateUser);

module.exports.userRouter = router;
