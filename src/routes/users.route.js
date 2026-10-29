'use strict';

const express = require('express');
const usersController = require('../controllers/users.controllers');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
