'use strict';

const express = require('express');
const router = express.Router();
const users = [];

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.get('/', getAllUsers(users));
router.get('/:userId', getUserById(users));
router.post('/', createUser(users));
router.patch('/:userId', updateUser(users));
router.delete('/:userId', deleteUser(users));

module.exports = router;
