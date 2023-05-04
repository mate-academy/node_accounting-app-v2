'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', usersController.create);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = {
  router,
};
