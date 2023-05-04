'use strict';

const express = require('express');
const {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsersAction);

router.post('/', addUserAction);

router.get('/:userId', getUserAction);

router.delete('/:userId', deleteUserAction);

router.patch('/:userId', updateUserAction);

module.exports = router;
