'use strict';

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  changeUsername,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.post('/users', express.json(), createUser);

router.get('/users/:userId', getUserById);

router.delete('/users/:userId', deleteUser);

router.patch('/users/:userId', express.json(), changeUsername);

module.exports.userRouter = router;
