'use strict';

const express = require('express');
const router = express.Router();

const {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
