'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const router = express.Router();

router.get('/', usersController.getAll);
router.post('/', usersController.create);
router.get('/:userId', usersController.getById);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = {
  router,
};
