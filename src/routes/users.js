'use strict';

const express = require('express');
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/users.js');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

function getRouterUsers() {
  return router;
};

module.exports = {
  getRouterUsers,
};
