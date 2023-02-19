'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

router.get('/', usersControllers.getAllUsers);
router.get('/:userId', usersControllers.getOneUser);

router.post('/', express.json(), usersControllers.addUser);

router.delete('/:userId', usersControllers.deleteUser);

router.patch('/:userId', express.json(), usersControllers.updateUser);

module.exports = {
  usersRouter: router,
};
