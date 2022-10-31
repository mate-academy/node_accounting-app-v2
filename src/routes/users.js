'use strict';

const express = require('express');
const userControllers = require('../controllers/users.js');

const router = express.Router();

router.get('/', userControllers.getAll);
router.get('/:userId', userControllers.getOne);

router.post('/', userControllers.createUser);
router.delete('/:userId', userControllers.deleteUser);
router.patch('/:userId', userControllers.updateUser);

module.exports = {
  router,
};
