'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const usersRoute = express.Router();

usersRoute.get('/', usersController.getAll);
usersRoute.get('/:userId', usersController.getOne);
usersRoute.post('/', usersController.create);
usersRoute.patch('/:userId', usersController.update);
usersRoute.delete('/:userId', usersController.remove);

module.exports = {
  usersRoute,
};
