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

router.get('/:todoId', getUserController);

router.post('/', createNewUserController);

router.delete('/:userId', deleteUserController);

router.patch('/:userId', updateUserController);

module.exports.userRouter = router;
