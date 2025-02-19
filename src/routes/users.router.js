'use strict';

const express = require('express');
const {
  getAllResponse,
  getUserResponse,
  createUserResponse,
  deleteUserResponse,
  updateUserResponse,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllResponse);
router.post('/', createUserResponse);
router.get('/:id', getUserResponse);
router.delete('/:id', deleteUserResponse);
router.patch('/:id', updateUserResponse);

module.exports = { router };
