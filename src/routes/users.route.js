const {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
} = require('./../controllers/users.controller');

const express = require('express');

const router = express.Router();

router.get('/users', getUsers);

router.post('/users', createUser);

router.get('/users/:id', getCurrentUser);

router.delete('/users/:id', removeCurrentUser);

router.patch('/users/:id', updateCurrentUser);

module.exports = {
  router,
};
