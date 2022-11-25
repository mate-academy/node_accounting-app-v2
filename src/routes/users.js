'use strict';

const express = require('express');

const {
  getAllController,
  getUserController,
  createNewUserController,
  deleteUserController,
  updateUserController,
} = require('../controllers/user');

const router = express.Router();

router.get('/', getAllController);

router.get('/users/:todoId', getUserController);

router.post('/', createNewUserController);

router.delete('/users/:userId', deleteUserController);

router.patch('/users/:userId', updateUserController);

module.exports.userRouter = router;
