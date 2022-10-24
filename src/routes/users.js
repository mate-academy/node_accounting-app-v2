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

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;
