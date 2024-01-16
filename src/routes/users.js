'use strict';

const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  editUserField,
} = require('../controllers/users.controller.js');
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createNewUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.patch('/:id', editUserField);

module.exports = {
  router,
};
