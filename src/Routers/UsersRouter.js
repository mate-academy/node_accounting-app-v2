'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {
  getUsersControll,
  getUserByIdControll,
  deleteUserControll,
  createUserControll,
  updateUserControll,
} = require('../Controllers/User.controller');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.get('/', getUsersControll);

usersRouter.get('/:userId', getUserByIdControll);

usersRouter.delete('/:userId', deleteUserControll);

usersRouter.post('/', createUserControll);

usersRouter.patch('/:userId', updateUserControll);

module.exports = {
  usersRouter,
};
