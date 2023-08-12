'use strict';

const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getUser,
  validateId,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.use('/:id', validateId);

userRouter.get('/', getAllUsers);
userRouter.post('/', createNewUser);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.patch('/:id', updateUser);

module.exports = {
  userRouter,
};
