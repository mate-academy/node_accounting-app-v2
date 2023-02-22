'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const router = express.Router();

router.get('/users', usersController.getAll);

router.get('/users/:userId', usersController.getById);

router.post('/users', express.json(), usersController.add);

router.delete('/users/:userId', usersController.remove);

router.patch('/users/:userId', express.json(), usersController.update);

module.exports = {
  router,
};
