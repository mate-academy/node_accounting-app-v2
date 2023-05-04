'use strict';

const express = require('express');
const {
  getAllAction,
  addUsersAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllAction);

router.post('/', addUsersAction);

router.get('/:userId', getUserAction);

router.delete('/:userId', deleteUserAction);

router.patch('/:userId', updateUserAction);

module.exports = { router };
