const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRoute = express.Router();

usersRoute.get('/', usersController.get);
usersRoute.get('/:id', usersController.getOne);
usersRoute.post('/', usersController.post);
usersRoute.patch('/:id', usersController.patch);
usersRoute.delete('/:id', usersController.deleting);

module.exports = {
  usersRoute,
};
