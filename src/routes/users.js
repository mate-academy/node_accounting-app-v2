'use strict';

const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/userService.js');

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

module.exports = router;
