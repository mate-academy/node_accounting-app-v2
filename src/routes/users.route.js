const express = require('express');

const {
  requestValidatorUser,
  currentValidatorUser,
} = require('../middleware/validator.middleware');
const {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
} = require('./../controllers/users.controller');

const router = express.Router();

router.get('/users', getUsers);

router.post('/users', requestValidatorUser, createUser);

router.get('/users/:id', currentValidatorUser, getCurrentUser);

router.delete('/users/:id', currentValidatorUser, removeCurrentUser);

router.patch('/users/:id', currentValidatorUser, updateCurrentUser);

module.exports = {
  router,
};
