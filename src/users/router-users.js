'use strict';

const express = require('express');
const userControllers = require('./controllers-users.js');

const router = express.Router();

router.get('/users', userControllers.getAll);

router.get('/users/:userId', userControllers.getUser);

router.post('/users', userControllers.createUser);

router.delete('/users/:userId', userControllers.deleteUser);

router.patch('/users/:userId', userControllers.updateUser);

module.exports = {
  router,
};
