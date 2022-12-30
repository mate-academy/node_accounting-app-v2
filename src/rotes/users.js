'use strict';

const express = require('express');

const router = express.Router();

const
  { getUsers,
    createUser,
    getUserById,
    removeUser,
    updateUser } = require('../controlers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.delete('/:userId', removeUser);
router.patch('/:userId', updateUser);

module.exports = {
  router,
};
