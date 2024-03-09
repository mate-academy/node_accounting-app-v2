'use strict';

const express = require('express');
const usersController = require('./users.controller');

const router = express.Router();

router.get('/', usersController.getAll);
router.post('/', usersController.add);
router.get('/:id', usersController.getOne);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

module.exports = { router };
