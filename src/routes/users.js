'use strict';

const usersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getUser);
router.post('/', express.json(), usersController.createUser);
router.delete('/:userId', usersController.removeUser);
router.patch('/:userId', express.json(), usersController.update);

module.exports = {
  router,
};
