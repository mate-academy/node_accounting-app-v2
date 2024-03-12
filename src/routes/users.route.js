'use strict';

const {
  get,
  getOne,
  createUser,
  updateUser,
  deleteUserId,
} = require('../controllers/user.controller');

const express = require('express');

const router = express.Router();

router.get('/', get);

router.get('/:userId', getOne);

router.post('/', createUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUserId);

module.exports = {
  router,
};
