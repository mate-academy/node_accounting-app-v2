'use strict';

const { Router } = require('express');
const {
  listUsers,
  getUser,
  createUserHandler,
  handleUpdate,
  deleteUserHandler,
} = require('../controllers/users.controller');

const usersRoute = Router();

usersRoute.get('/', listUsers);
usersRoute.get('/:id', getUser);
usersRoute.post('/', createUserHandler);
usersRoute.patch('/:id', handleUpdate);
usersRoute.put('/:id', handleUpdate);
usersRoute.delete('/:id', deleteUserHandler);

module.exports = { usersRoute };
