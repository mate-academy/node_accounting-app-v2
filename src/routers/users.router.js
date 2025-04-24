const express = require('express');
const { getUsers, createUser, getUser, removeUser, updateUser } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get(`/:id`, getUser);
usersRouter.delete('/:id', removeUser);
usersRouter.patch('/:id', updateUser);

module.exports = { usersRouter };