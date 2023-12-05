'use strict';

const express = require('express');
const {
  getUsers,
  postUser,
  getUserById,
  deleteUser,
  patchUser,
} = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getUsers);

router.post('/', express.json(), postUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.patch('/:id', express.json(), patchUser);

module.exports = { router };
