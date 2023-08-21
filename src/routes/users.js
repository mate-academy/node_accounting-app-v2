'use strict';

const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

module.exports = router;
