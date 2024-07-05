const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUser);

usersRouter.get('/:id', getUser);

usersRouter.delete('/:id', deleteUser);

usersRouter.patch('/:id', updateUser);

module.exports = { usersRouter };
